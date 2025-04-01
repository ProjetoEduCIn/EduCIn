"""
models.py
Mapeia as tabelas do banco de dados via SQLAlchemy.
"""

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Aluno(Base):
    """
    Representa a tabela 'alunos'.
    """
    __tablename__ = "alunos"

    id = Column(String, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    curso = Column(String, nullable=True)
    senha_hash = Column(String, nullable=True)  # Para hashear senhas

class Periodo(Base):
    """
    Tabela 'periodos'.
    """
    __tablename__ = "periodos"

    id = Column(String, primary_key=True)
    numero = Column(Integer)
    curso = Column(String)
    nome = Column(String)

    cadeiras = relationship("Cadeira", back_populates="periodo")

class Cadeira(Base):
    """
    Tabela 'cadeiras'.
    """
    __tablename__ = "cadeiras"

    id = Column(String, primary_key=True)
    nome = Column(String)
    periodo_id = Column(String, ForeignKey("periodos.id"))

    periodo = relationship("Periodo", back_populates="cadeiras")
    aulas = relationship("Aula", back_populates="cadeira")

# Se houver uma tabela Aula, defina aqui também...