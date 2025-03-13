"""
repositories.py (infra)
Implementa as interfaces usando SQLAlchemy e SQLite.
"""

from sqlalchemy import Column, String, Table, MetaData
from sqlalchemy.orm import declarative_base, Session
from typing import Optional, List
from app.domain.entities import Aluno
from app.domain.repositories import IAlunoRepository
from uuid import uuid4

Base = declarative_base()

# Tabela de Aluno (exemplo). Você criaria outras tabelas para Periodo, Cadeira, etc.
class AlunoDB(Base):
    __tablename__ = "alunos"
    id = Column(String, primary_key=True, index=True)
    nome = Column(String)
    email = Column(String, unique=True, index=True)
    curso = Column(String)

class AlunoRepository(IAlunoRepository):
    """
    Implementação concreta do repositório de alunos.
    """
    def __init__(self, db: Session):
        self.db = db

    def save(self, aluno: Aluno) -> Aluno:
        aluno_db = AlunoDB(
            id=aluno.id,
            nome=aluno.nome,
            email=aluno.email,
            curso=aluno.curso
        )
        self.db.merge(aluno_db)
        self.db.commit()
        self.db.refresh(aluno_db)
        return aluno

    def find_by_email(self, email: str) -> Optional[Aluno]:
        aluno_db = self.db.query(AlunoDB).filter_by(email=email).first()
        if not aluno_db:
            return None
        return Aluno(
            id=aluno_db.id,
            nome=aluno_db.nome,
            email=aluno_db.email,
            curso=aluno_db.curso
        )
