"""
database.py
Gerencia a conexão com o banco de dados SQLite usando SQLAlchemy.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.infrastructure.repositories import Base

DATABASE_URL = "sqlite:///./educacao.db"  # Caminho do seu banco

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Necessário para SQLite no modo single-thread
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    """
    Cria as tabelas no banco de dados, caso não existam.
    """
    Base.metadata.create_all(bind=engine)

def get_db():
    """
    Gera uma sessão de banco de dados para injeção de dependência.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
