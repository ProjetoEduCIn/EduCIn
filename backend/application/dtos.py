"""
dtos.py
Data Transfer Objects para requests/responses, isolando as entidades de domínio.
"""

from typing import Optional, List
from pydantic import BaseModel, EmailStr

class AlunoCreateDTO(BaseModel):
    nome: str
    email: EmailStr
    senha: str      # Senha em texto puro (será hash ao salvar)
    curso: str

class AlunoResponseDTO(BaseModel):
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