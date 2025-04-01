"""
main.py
Ponto de entrada da aplicação FastAPI.
"""

import os
import sys
import logging
from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import init_db
from application.controllers import router

app = FastAPI(title="Sistema Educacional")

# Configuração de CORS - DEVE SER O PRIMEIRO MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", 
                   "http://localhost:5175", 
                   "http://localhost:5176", 
                   "http://localhost:5177"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Adicionado para expor headers na resposta
    max_age=86400,  # Tempo em segundos para cache do preflight request (24 horas)
)

# Inicializa o banco
init_db()

# Adicione outros middlewares após o CORS
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Requisição recebida: {request.method} {request.url}")
    response = await call_next(request)
    return response

# Inclui as rotas
app.include_router(router, prefix="/api")

logger = logging.getLogger(__name__)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "API funcionando! Acesse /api para usar as rotas da aplicação."
    }