"""
database.py
Gerencia a conexão com o banco de dados SQLite usando SQLAlchemy.
"""

import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

DATABASE_URL = "sqlite:///educacao.db"  # Caminho do seu banco

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Necessário para SQLite no modo single-thread
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Configurar logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

def init_db():
    """
    Cria as tabelas no banco de dados, caso não existam.
    """
    print("Inicializando o banco de dados...")
    from models import Base  # Importe os modelos aqui para evitar o ciclo
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")

def get_db():
    """
    Gera uma sessão de banco de dados para injeção de dependência.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()