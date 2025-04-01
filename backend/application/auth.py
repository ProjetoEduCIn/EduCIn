"""
auth.py
Verificações de domínio e funções de hashing/verificação de senha.
"""

from fastapi import HTTPException, status
from passlib.context import CryptContext

# Permite criar e verificar hashes de senha
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verificar_dominio(email: str):
    
    #Permite apenas emails @cin.ufpe.br; gera HTTP 403 caso contrário.
    
    if not email.endswith("@cin.ufpe.br"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas emails @cin.ufpe.br são permitidos."
        )

def hash_password(plain_password: str) -> str:
    
    #Gera um hash (bcrypt) a partir de uma senha em texto puro.
    
    return pwd_context.hash(plain_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    
    #Verifica se uma senha em texto puro corresponde ao hash armazenado.
    
    return pwd_context.verify(plain_password, hashed_password)