"""
repositories.py (infra)
Implementa as interfaces usando SQLAlchemy e SQLite.
"""

from typing import Optional
from sqlalchemy.orm import Session
from database import Base
from domain.entities import Aluno as AlunoDomain
from domain.repositories import IAlunoRepository
# Importa do models.py a classe do ORM
from models import Aluno as AlunoModel

class AlunoRepository(IAlunoRepository):
    
    #Repositório de Aluno, persistindo em SQLite/SQLAlchemy.
    #Usa a classe Aluno do models.py para mapear a tabela 'alunos'.
    
    def __init__(self, db: Session):
        self.db = db

    def save(self, aluno: AlunoDomain) -> AlunoDomain:
        aluno_db = AlunoModel(
            id=aluno.id,
            nome=aluno.nome,
            email=aluno.email,
            curso=aluno.curso,
            senha_hash=aluno.senha_hash
        )
        self.db.merge(aluno_db)
        self.db.commit()
        self.db.refresh(aluno_db)
        # Retorna o objeto de domínio
        return aluno

    def find_by_email(self, email: str) -> Optional[AlunoDomain]:
        aluno_db = self.db.query(AlunoModel).filter_by(email=email).first()
        if not aluno_db:
            return None
        # Convertendo AlunoModel -> AlunoDomain
        return AlunoDomain(
            id=aluno_db.id,
            nome=aluno_db.nome,
            email=aluno_db.email,
            curso=aluno_db.curso,
            senha_hash=aluno_db.senha_hash
        )