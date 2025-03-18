import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from application.controllers import router



app = FastAPI(title="Sistema Educacional")

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique domínios confiáveis
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir roteador de API
app.include_router(router, prefix="/api")

# Rota raiz para teste
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "API funcionando! Acesse /api para usar as rotas da aplicação."
    }