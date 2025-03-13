"""
dtos.py
Modelos de entrada e saída de dados (para requests/responses).
Evita expor diretamente as entidades de domínio.
"""

from pydantic import BaseModel, EmailStr

class AlunoCreateDTO(BaseModel):
    """
    Dados recebidos para criar um novo aluno.
    """
    nome: str
    email: EmailStr
    curso: str

class AlunoResponseDTO(BaseModel):
    """
    Dados retornados ao frontend após criar ou buscar um aluno.
    """
    id: str
    nome: str
    email: EmailStr
    curso: str
