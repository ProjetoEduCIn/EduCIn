"""
database.py
Configura e gerencia a conexão com o banco via SQLAlchemy.
"""

import logging
import os
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./educacao.db")

# Ajuste para SQLite (check_same_thread)
engine_args = {}
if DATABASE_URL.startswith("sqlite"):
    engine_args["connect_args"] = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, **engine_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

logging.basicConfig(level=logging.WARNING)
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

def init_db() -> None:
    """
    Cria tabelas no banco baseadas em modelos que herdam de Base.
    """
    try:
        from models import Base as ModelsBase
        assert Base == ModelsBase  # Garante mesma instância de Base
        logging.info(f"Verificando/criando tabelas em: {DATABASE_URL}")
        Base.metadata.create_all(bind=engine)
    except ImportError as e:
        logging.exception(f"Falha ao importar 'models': {e}")
    except Exception as e:
        logging.exception(f"Erro ao criar/verificar tabelas: {e}")
        raise

def get_db() -> Generator[Session, None, None]:
    """
    Gera uma sessão de banco de dados e fecha após o uso.
    """
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()