"""
auth.py
Exemplo básico de como verificar se um email é do domínio @cin.ufpe.br.

Em produção, você usaria OAuth2 com Google.
"""

from fastapi import HTTPException, status

def verificar_dominio(email: str):
    """
    Verifica se o email é do domínio @cin.ufpe.br.
    Caso contrário, lança um erro HTTP 403.
    """
    if not email.endswith("@cin.ufpe.br"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas emails @cin.ufpe.br são permitidos."
        )
