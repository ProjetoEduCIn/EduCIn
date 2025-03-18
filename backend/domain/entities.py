"""
entities.py
Entidades (Modelos de Domínio) que representam o coração do negócio.
"""

from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from uuid import uuid4

class Aluno(BaseModel):
    """
    Representa um aluno no sistema.
    """
    id: str = str(uuid4())
    nome: str
    email: str
    curso: str  # Ex.: "Engenharia", "Sistemas", "Computação"

class Periodo(BaseModel):
    """
    Período que pertence a um curso.
    Um curso tem vários períodos (de 1 a 10, por ex.).
    """
    id: str = str(uuid4())
    numero: int    # Ex.: 1 para primeiro período, 2 para segundo, etc.
    curso: str     # Para filtrar qual curso ("Engenharia", etc.)
    nome: str      # Opcional: "Período 1", "Período 2", ...
    cadeiras: List[str] = []  # IDs das cadeiras

class Cadeira(BaseModel):
    """
    Cada cadeira (módulo) pertence a exatamente um período.
    """
    id: str = str(uuid4())
    nome: str
    periodo_id: str
    # Recursos
    aulas: List[str] = []   # IDs das aulas (vídeos)
    provas: List[str] = []  # IDs dos PDFs de provas
    listas: List[str] = []  # IDs dos PDFs de listas de exercícios
    slides: List[str] = []  # IDs dos arquivos slides
    links: List[str] = []   # Links extras (YouTube, sites, etc.)

class Aula(BaseModel):
    """
    Aula em formato de vídeo.
    """
    id: str = str(uuid4())
    titulo: str
    video_url: HttpUrl
    cadeira_id: str

class Arquivo(BaseModel):
    """
    Representa um arquivo de mídia (PDF, PPT, etc.) armazenado no Firebase.
    """
    id: str = str(uuid4())
    nome: str
    tipo: str  # "prova", "lista", "slide"
    url: HttpUrl
    cadeira_id: str
