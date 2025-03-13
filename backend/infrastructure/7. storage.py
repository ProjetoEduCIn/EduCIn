"""
storage.py
Gerencia o upload de arquivos (PDF, PPT, etc.) para Firebase Storage.
"""

import firebase_admin
from firebase_admin import credentials, storage
import os

# Carrega credenciais a partir de um arquivo JSON que você baixa do console do Firebase
# Ajuste o caminho conforme seu projeto
cred_path = os.getenv("FIREBASE_CRED_PATH", "firebase_credentials.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        "storageBucket": "SEU_BUCKET.appspot.com"  # Exemplo: "meu-projeto.appspot.com"
    })

def upload_arquivo(caminho_local: str, nome_destino: str) -> str:
    """
    Faz upload do arquivo para o Firebase Storage e retorna a URL pública.
    """
    bucket = storage.bucket()
    blob = bucket.blob(nome_destino)
    blob.upload_from_filename(caminho_local)

    # Tornar o arquivo público (opcional, depende da política do seu app)
    blob.make_public()

    return blob.public_url
