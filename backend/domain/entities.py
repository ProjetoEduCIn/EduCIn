"""
entities.py
Modelos de domínio representando o coração do sistema.
"""

from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from uuid import uuid4

class Aluno(BaseModel):
    """
    Aluno do sistema.
    """
    id: str = str(uuid4())
    nome: str
    email: str
    curso: str
    # Novo campo para guardar hash da senha no domínio
    senha_hash: Optional[str] = None

class Periodo(BaseModel):
    id: str = str(uuid4())
    numero: int
    curso: str
    nome: str
    cadeiras: List[str] = []

class Cadeira(BaseModel):
    id: str = str(uuid4())
    nome: str
    periodo_id: str
    provas: List[str] = []
    listas: List[str] = []
    slides: List[str] = []
    links: List[str] = []



class Arquivo(BaseModel):
    id: str = str(uuid4())
    nome: str
    tipo: str
    url: HttpUrl
    cadeira_id: str