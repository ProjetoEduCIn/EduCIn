"""
controllers.py
Contém as rotas (endpoints) da aplicação para lidar com Aluno, Período, Cadeira, etc.
"""



from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import jwt
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db
from domain.entities import Aluno, Cadeira
from infrastructure.repositories import AlunoRepository
from application.dtos import AlunoCreateDTO, AlunoResponseDTO
from application.auth import verificar_dominio

# Configurações para JWT
SECRET_KEY = "692737049916-miegon1ifskij17dpt54ufq13qfulto7.apps.googleusercontent.com" # Em produção, use variáveis de ambiente
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Configurações para Google OAuth
GOOGLE_CLIENT_ID = "692737049916-miegon1ifskij17dpt54ufq13qfulto7.apps.googleusercontent.com"  # Mova para variáveis de ambiente em produção
COOKIE_NAME = "first_access_token"

router = APIRouter()

# Classes para autenticação
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

# Função para criar token JWT
def create_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Rotas de autenticação
@router.post("/alunos/login", response_model=TokenResponse)
def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    # Em produção, use uma tabela de usuário separada com senhas hasheadas
    # Esta implementação é apenas para demonstração
    
    # Verifica se é o modo de desenvolvimento
    if login_request.email == "admin@cin.ufpe.br" and login_request.senha == "admin":
        # Cria um usuário admin fictício para desenvolvimento
        aluno = Aluno(
            id="admin-id", 
            nome="Admin", 
            email="admin@cin.ufpe.br", 
            curso="SI"
        )
    else:
        # Busca o aluno pelo email
        aluno_repo = AlunoRepository(db)
        aluno = aluno_repo.find_by_email(login_request.email)
        
        if not aluno:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciais inválidas",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Em um sistema real, verificaria a senha hasheada aqui
        # if not verify_password(login_request.senha, aluno.senha_hash):
        #     raise HTTPException(...)
    
    # Cria tokens
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_token(
        data={"sub": aluno.email, "id": aluno.id}, expires_delta=access_token_expires
    )
    
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token = create_token(
        data={"sub": aluno.email, "id": aluno.id, "refresh": True}, 
        expires_delta=refresh_token_expires
    )
    
    # Converte para DTO e retorna
    aluno_dto = AlunoResponseDTO(
        id=aluno.id,
        nome=aluno.nome,
        email=aluno.email,
        curso=aluno.curso
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": aluno_dto
    }

@router.post("/refresh-token", response_model=TokenResponse)
def refresh_token(refresh_request: RefreshRequest, db: Session = Depends(get_db)):
    try:
        # Decodifica o refresh token
        payload = jwt.decode(refresh_request.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user_id = payload.get("id")
        is_refresh = payload.get("refresh")
        
        if not email or not user_id or not is_refresh:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Busca o aluno para confirmar que ele existe
    aluno_repo = AlunoRepository(db)
    aluno = aluno_repo.find_by_email(email)
    if not aluno:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não encontrado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Gera novos tokens
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_token(
        data={"sub": email, "id": user_id}, expires_delta=access_token_expires
    )
    
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    new_refresh_token = create_token(
        data={"sub": email, "id": user_id, "refresh": True}, 
        expires_delta=refresh_token_expires
    )
    
    # Converte para DTO e retorna
    aluno_dto = AlunoResponseDTO(
        id=aluno.id,
        nome=aluno.nome,
        email=aluno.email,
        curso=aluno.curso
    )
    
    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer",
        "user": aluno_dto
    }

@router.post("/auth/google")
async def google_login(request: GoogleLoginRequest, db: Session = Depends(get_db)):
    try:
        print(f"Token recebido no backend: {request.token}")  # Log do token

        idinfo = id_token.verify_oauth2_token(
            request.token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )
        print(f"Informações do usuário: {idinfo}")  # Log das informações

        email = idinfo['email']

        # Verifica se é email do CIn
        if not email.endswith("@cin.ufpe.br"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Apenas emails @cin.ufpe.br são permitidos"
            )

        # Verifica se o usuário já existe
        aluno_repo = AlunoRepository(db)
        aluno = aluno_repo.find_by_email(email)

        if aluno:
            # Usuário já existe
            access_token = create_token({"sub": email, "id": aluno.id})
            refresh_token = create_token(
                {"sub": email, "id": aluno.id, "refresh": True},
                expires_delta=timedelta(days=7)
            )
            
            return {
                "status": "existing_user",
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": AlunoResponseDTO.from_orm(aluno)
            }
        else:
            # Primeiro acesso
            return {
                "status": "first_access",
                "email": email,
                "picture": idinfo.get('picture'),
                "given_name": idinfo.get('given_name')
            }

    except ValueError as e:
        print(f"Erro ao validar token do Google: {e}")
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )
    except Exception as e:
        print(f"Erro inesperado: {e}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/first-access")
async def complete_first_access(request: FirstAccessRequest, response: Response, db: Session = Depends(get_db)):
    if not request:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Dados de primeiro acesso não encontrados"
        )

    try:
        # Verifica o token de primeiro acesso
        payload = jwt.decode(
            request.google_token, 
            SECRET_KEY, 
            algorithms=[ALGORITHM]
        )
        
        if not payload.get("first_access"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido"
            )

        # Validações
        if request.senha != request.senha_confirmacao:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Senhas não conferem"
            )
            
        if not request.email_cin.endswith("@cin.ufpe.br"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email deve ser do domínio @cin.ufpe.br"
            )

        # Cria novo aluno
        aluno = Aluno(
            id=str(uuid4()),
            nome=request.nome_preferido,
            email=request.email_cin,
            curso=request.curso,
            senha_hash=hash_password(request.senha)  # Implemente esta função
        )

        # Salva no banco
        aluno_repo = AlunoRepository(db)
        aluno_salvo = aluno_repo.save(aluno)

        # Gera tokens de acesso
        access_token = create_token({"sub": aluno.email, "id": aluno.id})
        refresh_token = create_token(
            {"sub": aluno.email, "id": aluno.id, "refresh": True},
            expires_delta=timedelta(days=7)
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": AlunoResponseDTO.from_orm(aluno_salvo)
        }

    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de primeiro acesso inválido"
        )

# Rotas de alunos
@router.post("/alunos", response_model=AlunoResponseDTO)
def criar_aluno(aluno_dto: AlunoCreateDTO, db: Session = Depends(get_db)):
    # Verifica se o email é do domínio @cin.ufpe.br
    verificar_dominio(aluno_dto.email)
    
    # Verifica se já existe um aluno com este email
    aluno_repo = AlunoRepository(db)
    if aluno_repo.find_by_email(aluno_dto.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Já existe um aluno com este email"
        )
    
    # Cria o aluno no domínio
    aluno = Aluno(
        nome=aluno_dto.nome,
        email=aluno_dto.email,
        curso=aluno_dto.curso
    )
    
    # Salva no repositório
    aluno_salvo = aluno_repo.save(aluno)
    
    # Converte para DTO e retorna
    return AlunoResponseDTO(
        id=aluno_salvo.id,
        nome=aluno_salvo.nome,
        email=aluno_salvo.email,
        curso=aluno_salvo.curso
    )

# DTOs adicionais para disciplinas
class DisciplinaDTO(BaseModel):
    id: str
    nome: str
    imagem: Optional[str] = None

# Rota para listar disciplinas por curso e período
@router.get("/cursos/{curso_id}/disciplinas", response_model=List[DisciplinaDTO])
def listar_disciplinas_por_curso(curso_id: str, periodo: Optional[int] = None):
    """
    Retorna as disciplinas de um curso, opcionalmente filtradas por período.
    """
    # Simulação de dados, em produção você buscaria do banco
    disciplinas = []
    
    if curso_id == "SI":  # Sistemas de Informação
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
    elif curso_id == "CC":  # Ciência da Computação
        if periodo == 1:
            disciplinas = [
                {"id": "ip-cc", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "sd-cc", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad-cc", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md-cc", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
    elif curso_id == "EC":  # Engenharia da Computação
        if periodo == 1:
            disciplinas = [
                {"id": "ip-ec", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "sd-ec", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad-ec", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md-ec", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
    
    return disciplinas

# Detalhes da disciplina
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
    """
    Retorna os detalhes de uma disciplina específica.
    """
    # Simulação de dados, em produção você buscaria do banco
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
    
    # Se não encontrar, retorna um objeto vazio
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Disciplina com ID {disciplina_id} não encontrada"
    )

@router.get("/disciplinas/{disciplina_id}/conteudo", response_model=ConteudoDTO)
def obter_conteudo_disciplina(disciplina_id: str):
    """
    Retorna o conteúdo detalhado de uma disciplina.
    """
    # Simulação de dados, em produção você buscaria do banco
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
    
    # Se não encontrar, retorna um objeto vazio
    return {"topicos": [], "links": []}

@router.get("/disciplinas/{disciplina_id}/duvidas")
def obter_duvidas_disciplina(disciplina_id: str):
    """
    Retorna as dúvidas frequentes sobre a disciplina.
    """
    # Simulação de dados, em produção você buscaria do banco
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