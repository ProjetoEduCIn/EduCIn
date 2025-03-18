"""
dtos.py
Modelos de entrada e saída de dados (para requests/responses).
Evita expor diretamente as entidades de domínio.
"""

from pydantic import BaseModel, EmailStr
from typing import Optional, List

class AlunoCreateDTO(BaseModel):
    """
    Dados recebidos para criar um novo aluno.
    """
    nome: str
    email: EmailStr
    senha: str  # Em produção, você precisaria hash essa senha
    curso: str

class AlunoResponseDTO(BaseModel):
    """
    Dados retornados ao frontend após criar ou buscar um aluno.
    """
    id: str
    nome: str
    email: EmailStr
    curso: str

class DisciplinaDTO(BaseModel):
    id: str
    nome: str
    imagem: Optional[str] = None

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