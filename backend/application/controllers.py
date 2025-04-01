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
    
    #Gera um token JWT com expiração configurável.
    
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ----- ROTAS DE AUTENTICAÇÃO -----

@router.post("/alunos/login", response_model=TokenResponse)
def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    
    #Realiza login de um aluno verificando email e senha com hash no banco.
    
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
    
    #Faz login via token do Google; aceita apenas emails @cin.ufpe.br.
    
    try:
        idinfo = id_token.verify_oauth2_token(request.token, requests.Request(), GOOGLE_CLIENT_ID)
        email = idinfo.get('email')
        if not email or not email.endswith("@cin.ufpe.br"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Apenas emails @cin.ufpe.br são permitidos"
            )
        repo = AlunoRepository(db)
        aluno = repo.find_by_email(email)
        if aluno:
            access_token = create_token({"sub": email, "id": aluno.id})
            refresh_token = create_token({"sub": email, "id": aluno.id, "refresh": True}, timedelta(days=7))
            return {
                "status": "existing_user",
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": AlunoResponseDTO.from_orm(aluno)
            }
        return {
            "status": "first_access",
            "email": email,
            "picture": idinfo.get('picture'),
            "given_name": idinfo.get('given_name')
        }
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/first-access")
async def complete_first_access(request: FirstAccessRequest, response: Response, db: Session = Depends(get_db)):
    
    #Rota de exemplo para completar o cadastro do usuário no primeiro acesso.
    
    if not request:
        raise HTTPException(status_code=401, detail="Dados de primeiro acesso não encontrados")
    # Aqui você implementaria a criação de um novo aluno com a senha hash
    return {"detail": "Fluxo de primeiro acesso a implementar."}

# ----- ROTAS DE ALUNOS -----

@router.post("/alunos", response_model=AlunoResponseDTO)
def criar_aluno(aluno_dto: AlunoCreateDTO, db: Session = Depends(get_db)):
    
    #Cria um novo aluno (email @cin.ufpe.br) caso ainda não exista, armazenando a senha como hash.
    
    verificar_dominio(aluno_dto.email)
    repo = AlunoRepository(db)
    if repo.find_by_email(aluno_dto.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Já existe um aluno com este email"
        )

    # Gera hash da senha em texto puro
    senha_hashed = hash_password(aluno_dto.senha)

    novo_aluno = Aluno(
        nome=aluno_dto.nome,
        email=aluno_dto.email,
        curso=aluno_dto.curso,
        senha_hash=senha_hashed
    )

    salvo = repo.save(novo_aluno)
    return AlunoResponseDTO(
        id=salvo.id,
        nome=salvo.nome,
        email=salvo.email,
        curso=salvo.curso
    )

# ----- ROTAS DE DISCIPLINAS (EXEMPLO DE DADOS ESTÁTICOS) -----

class DisciplinaDTO(BaseModel):
    id: str
    nome: str
    imagem: Optional[str] = None

@router.get("/cursos/{curso_id}/disciplinas", response_model=List[DisciplinaDTO])
def listar_disciplinas_por_curso(curso_id: str, periodo: Optional[int] = None):
    
    #Lista disciplinas por curso e período (dados simulados).
   
    disciplinas = []
    if curso_id == "SI":
        if periodo == 1:
            disciplinas = [
                {"id": "sd", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ip", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
        elif periodo == 2:
            disciplinas = [
                {"id": "edoo", "nome": "Estrutura De Dados Orientada a Objetos", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ds", "nome": "Desenvolvimento de Software", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "acso", "nome": "Arquitetura de Computadores e Sistemas Operacionais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "calc1", "nome": "Cálculo 1", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
    elif curso_id == "CC":
        if periodo == 1:
            disciplinas = [
                {"id": "ip-cc", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "sd-cc", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad-cc", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md-cc", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
    elif curso_id == "EC":
        if periodo == 1:
            disciplinas = [
                {"id": "ip-ec", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "sd-ec", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad-ec", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md-ec", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
    return disciplinas

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