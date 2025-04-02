"""
controllers.py
Rotas principais da aplicação para autenticação, alunos e disciplinas.
"""

import os
import sys
from datetime import datetime, timedelta
from typing import List, Optional

import jwt
from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie
from google.auth.transport import requests
from google.oauth2 import id_token
from pydantic import BaseModel
from sqlalchemy.orm import Session

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db
from domain.entities import Aluno
from infrastructure.repositories import AlunoRepository
from application.dtos import (
    AlunoCreateDTO,
    AlunoResponseDTO,
)
from application.auth import verificar_dominio, hash_password, verify_password
from application.auth import pwd_context  # Opcional, se quiser usar diretamente

# Configurações básicas; em produção use variáveis de ambiente
SECRET_KEY = "692737049916-miegon1ifskij17dpt54ufq13qfulto7.apps.googleusercontent.com"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
GOOGLE_CLIENT_ID = "692737049916-miegon1ifskij17dpt54ufq13qfulto7.apps.googleusercontent.com"
COOKIE_NAME = "first_access_token"

router = APIRouter()

# ----- MODELOS PARA AUTENTICAÇÃO -----

class LoginRequest(BaseModel):
    email: str
    senha: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: AlunoResponseDTO

class RefreshRequest(BaseModel):
    refresh_token: str

class GoogleLoginRequest(BaseModel):
    token: str

class FirstAccessRequest(BaseModel):
    nome_preferido: str
    email_cin: str
    curso: str
    senha: str
    senha_confirmacao: str
    google_token: str

# ----- FUNÇÕES DE SUPORTE -----

def create_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Gera um token JWT com expiração configurável.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ----- ROTAS DE AUTENTICAÇÃO -----

@router.post("/alunos/login", response_model=TokenResponse)
def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    """
    Realiza login de um aluno verificando email e senha com hash no banco.
    """
    # Admin fictício para desenvolvimento
    if login_request.email == "admin@cin.ufpe.br" and login_request.senha == "admin":
        # Gera aluno sem senha_hash (apenas para teste)
        aluno = Aluno(id="admin-id", nome="Admin", email="admin@cin.ufpe.br", curso="SI", senha_hash=None)
    else:
        repo = AlunoRepository(db)
        aluno = repo.find_by_email(login_request.email)

        if not aluno:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciais inválidas",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not aluno.senha_hash:
            # Caso o aluno não tenha senha_hash salvo
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Senha não cadastrada ou inválida"
            )

        # Verifica se a senha informada corresponde ao hash armazenado
        if not verify_password(login_request.senha, aluno.senha_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciais inválidas",
                headers={"WWW-Authenticate": "Bearer"},
            )

    access_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

    access_token = create_token({"sub": aluno.email, "id": aluno.id}, access_expires)
    refresh_token = create_token({"sub": aluno.email, "id": aluno.id, "refresh": True}, refresh_expires)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": AlunoResponseDTO(
            id=aluno.id,
            nome=aluno.nome,
            email=aluno.email,
            curso=aluno.curso
        )
    }

@router.post("/refresh-token", response_model=TokenResponse)
def refresh_token_endpoint(refresh_request: RefreshRequest, db: Session = Depends(get_db)):
    
    #Cria um novo conjunto de tokens a partir de um refresh_token válido.
    
    try:
        payload = jwt.decode(refresh_request.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        if not payload.get("refresh"):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")
        email = payload.get("sub")
        user_id = payload.get("id")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido ou expirado")

    repo = AlunoRepository(db)
    aluno = repo.find_by_email(email)
    if not aluno:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não encontrado")

    access_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

    new_access_token = create_token({"sub": email, "id": user_id}, access_expires)
    new_refresh_token = create_token({"sub": email, "id": user_id, "refresh": True}, refresh_expires)

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer",
        "user": AlunoResponseDTO(
            id=aluno.id,
            nome=aluno.nome,
            email=aluno.email,
            curso=aluno.curso
        )
    }

@router.post("/auth/google")
async def google_login(request: GoogleLoginRequest, db: Session = Depends(get_db)):
    """
    Faz login via token do Google; aceita apenas emails @cin.ufpe.br.
    """
    try:
        # Verifica o token do Google
        idinfo = id_token.verify_oauth2_token(request.token, requests.Request(), GOOGLE_CLIENT_ID)
        email = idinfo.get('email')
        if not email or not email.endswith("@cin.ufpe.br"):
            raise HTTPException(status_code=400, detail="Email inválido ou não permitido.")

        # Verifica se o usuário já existe no banco de dados
        repo = AlunoRepository(db)
        aluno = repo.find_by_email(email)
        if aluno:
            # Usuário já existe, gera os tokens
            access_token = create_token({"sub": aluno.email, "id": aluno.id})
            refresh_token = create_token({"sub": aluno.email, "id": aluno.id, "refresh": True}, timedelta(days=7))
            return {
                "status": "existing_user",
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": AlunoResponseDTO(
                    id=aluno.id,
                    nome=aluno.nome,
                    email=aluno.email,
                    curso=aluno.curso
                )
            }

        # Usuário não existe, retorna status de "primeiro acesso"
        return {
            "status": "first_access",
            "email": email,
            "picture": idinfo.get('picture'),
            "given_name": idinfo.get('given_name')
        }
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        print(f"Erro no login com Google: {e}")
        raise HTTPException(status_code=500, detail="Erro interno no servidor")

@router.post("/first-access", response_model=TokenResponse)
async def complete_first_access(request: FirstAccessRequest, db: Session = Depends(get_db)):
    # Validar dados
    if request.senha != request.senha_confirmacao:
        raise HTTPException(status_code=400, detail="Senhas não coincidem")
        
    # Gerar hash da senha
    senha_hash = hash_password(request.senha)
    
    # Criar novo aluno
    novo_aluno = Aluno(
        nome=request.nome_preferido,
        email=request.email_cin,
        curso=request.curso,
        senha_hash=senha_hash
    )
    
    # Salvar no banco
    repo = AlunoRepository(db)
    aluno_salvo = repo.save(novo_aluno)
    
    # Gerar tokens
    access_token = create_token({"sub": aluno_salvo.email, "id": aluno_salvo.id})
    refresh_token = create_token({"sub": aluno_salvo.email, "id": aluno_salvo.id, "refresh": True}, timedelta(days=7))
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": aluno_salvo.id,
            "nome": aluno_salvo.nome,
            "email": aluno_salvo.email,
            "curso": aluno_salvo.curso
        }
    }

# ----- ROTAS DE ALUNOS -----

@router.post("/alunos", response_model=AlunoResponseDTO)
def criar_aluno(aluno_dto: AlunoCreateDTO, db: Session = Depends(get_db)):
    try:
        verificar_dominio(aluno_dto.email)
        repo = AlunoRepository(db)
        if repo.find_by_email(aluno_dto.email):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Já existe um aluno com este email"
            )

        senha_hashed = hash_password(aluno_dto.senha)
        print(f"Hash da senha gerado: {senha_hashed}")  # Log para verificar o hash

        novo_aluno = Aluno(
            nome=aluno_dto.nome,
            email=aluno_dto.email,
            curso=aluno_dto.curso,
            senha_hash=senha_hashed
        )

        salvo = repo.save(novo_aluno)
        print(f"Aluno salvo no banco: {salvo}")  # Log para verificar o aluno salvo

        return AlunoResponseDTO(
            id=salvo.id,
            nome=salvo.nome,
            email=salvo.email,
            curso=salvo.curso
        )
    except Exception as e:
        print(f"Erro ao criar aluno: {e}")
        raise HTTPException(status_code=500, detail="Erro interno no servidor")

# ----- ROTAS DE DISCIPLINAS -----

class DisciplinaDTO(BaseModel):
    id: str
    nome: str
    imagem: Optional[str] = None

@router.get("/disciplinas", response_model=dict)
def listar_todas_disciplinas():
    """
    Lista todas as disciplinas organizadas por período.
    """
    return {
        "1": [
            {"id": "sd", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
            {"id": "ip", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
            {"id": "cad", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
            {"id": "md", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
        ],
        "2": [
            {"id": "edoo", "nome": "Estrutura De Dados Orientada a Objetos", "imagem": "/imagens/ImagemLivro.jpg"},
            {"id": "ds", "nome": "Desenvolvimento de Software", "imagem": "/imagens/ImagemLivro.jpg"},
            {"id": "acso", "nome": "Arquitetura de Computadores e Sistemas Operacionais", "imagem": "/imagens/ImagemLivro.jpg"},
            {"id": "calc1", "nome": "Cálculo 1", "imagem": "/imagens/ImagemLivro.jpg"}
        ],
        # Adicione os outros períodos...
    }

class ConteudoDTO(BaseModel):
    topicos: List[str] = []
    links: List[dict] = []

class DisciplinaDetalheDTO(BaseModel):
    id: str
    nome: str
    codigo: Optional[str] = None
    descricao: Optional[str] = None
    cargaHoraria: Optional[int] = None
    professores: List[str] = []
    imagem: Optional[str] = None

@router.get("/disciplinas/{disciplina_id}", response_model=DisciplinaDetalheDTO)
def obter_detalhes_disciplina(disciplina_id: str):
    
    #Retorna detalhes de uma disciplina (dados simulados).
    
    if disciplina_id == "ip":
        return {
            "id": "ip",
            "nome": "Introdução à Programação",
            "codigo": "IF668",
            "descricao": "Introdução aos conceitos básicos de programação usando Python.",
            "cargaHoraria": 60,
            "professores": ["João Silva", "Maria Santos"],
            "imagem": "/imagens/ImagemLivro.jpg"
        }
    elif disciplina_id == "sd":
        return {
            "id": "sd",
            "nome": "Sistemas Digitais",
            "codigo": "IF675",
            "descricao": "Fundamentos de sistemas digitais e lógica booleana.",
            "cargaHoraria": 60,
            "professores": ["Carlos Oliveira", "Ana Souza"],
            "imagem": "/imagens/ImagemLivro.jpg"
        }
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Disciplina com ID {disciplina_id} não encontrada"
    )

@router.get("/disciplinas/{disciplina_id}/conteudo", response_model=ConteudoDTO)
def obter_conteudo_disciplina(disciplina_id: str):
    """
    Retorna o conteúdo programático de uma disciplina (dados simulados).
    """
    if disciplina_id == "ip":
        return {
            "topicos": [
                "Introdução a algoritmos",
                "Variáveis e tipos de dados",
                "Estruturas condicionais",
                "Estruturas de repetição",
                "Funções",
                "Listas e dicionários",
                "Orientação a objetos"
            ],
            "links": [
                {"texto": "Apostila de Python", "url": "https://example.com/python"},
                {"texto": "Exercícios", "url": "https://example.com/exercises"},
                {"texto": "Material complementar", "url": "https://example.com/extra"}
            ]
        }
    return {"topicos": [], "links": []}

@router.get("/disciplinas/{disciplina_id}/duvidas")
def obter_duvidas_disciplina(disciplina_id: str):
    """
    Retorna dúvidas frequentes sobre a disciplina (dados simulados).
    """
    return [
        {
            "pergunta": "Qual a linguagem de programação utilizada?",
            "resposta": "Python"
        },
        {
            "pergunta": "Preciso ter conhecimento prévio?",
            "resposta": "Não, a disciplina é introdutória."
        }
    ]

@router.get("/cursos/{curso_id}/disciplinas")
def listar_disciplinas_por_curso(curso_id: str, periodo: Optional[int] = None):
    """
    Lista todas as disciplinas de um curso específico, com filtro opcional por período.
    """
    disciplinas_por_periodo = {
        "CC": {
            1: [
                {"id": "ip-cc", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "sd-cc", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad-cc", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md-cc", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            2: [
                {"id": "edoo-cc", "nome": "Estrutura De Dados", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ds-cc", "nome": "Desenvolvimento de Software", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "acso-cc", "nome": "Arquitetura de Computadores", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "calc1-cc", "nome": "Cálculo 1", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            3: [
                {"id": "av-cc", "nome": "Álgebra Vetorial", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "alg-cc", "nome": "Algoritmos", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "bd-cc", "nome": "Banco de Dados", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "iesi-cc", "nome": "Integ e Evol de SI", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
        },
        "EC": {
            1: [
                {"id": "ip-ec", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "sd-ec", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad-ec", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md-ec", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            2: [
                {"id": "edoo-ec", "nome": "Estrutura De Dados", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ds-ec", "nome": "Desenvolvimento de Software", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "acso-ec", "nome": "Arquitetura de Computadores", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "calc1-ec", "nome": "Cálculo 1", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
        },
        "SI": {
            1: [
                {"id": "sd", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ip", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            2: [
                {"id": "edoo", "nome": "Estrutura De Dados Orientada a Objetos", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ds", "nome": "Desenvolvimento de Software", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "acso", "nome": "Arquitetura de Computadores e SO", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "calc1", "nome": "Cálculo 1", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            3: [
                {"id": "av", "nome": "Álgebra Vetorial", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "alg", "nome": "Algoritmos", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "bd", "nome": "Banco de Dados", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "iesi", "nome": "Integ e Evol de SI", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            4: [
                {"id": "epc", "nome": "Estatística e Probabilidade", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "lc", "nome": "Lógica para Computação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "isdr", "nome": "Introdução a Sistemas Distribuídos e Redes", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "amcd", "nome": "Aprendizado de Máquina e Ciência de Dados", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            5: [
                {"id": "ei", "nome": "Empreendimentos em Informática", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "asesi", "nome": "Aspectos Sócio-Econômicos de SI", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ac", "nome": "Administração Contemporânea", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            6: [
                {"id": "ae", "nome": "Arquitetura Empresarial", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "gpn", "nome": "Gestão de Processos de Negócios", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            7: [
                {"id": "ctc", "nome": "Comunicação Técnica e Científica", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "apsi", "nome": "Análise e Projeto de SI", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            8: [
                {"id": "tcc", "nome": "TCC", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
        }
    }

    if curso_id not in disciplinas_por_periodo:
        raise HTTPException(
            status_code=404,
            detail=f"Curso {curso_id} não encontrado"
        )

    if periodo is not None:
        if periodo not in disciplinas_por_periodo[curso_id]:
            # Em vez de retornar 404, retornamos uma lista vazia
            return []
        return disciplinas_por_periodo[curso_id][periodo]

    return disciplinas_por_periodo[curso_id]