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

init_db()

app = FastAPI(title="Sistema Educacional")

# Configuração de CORS (em produção, restrinja a origem)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)

app.include_router(router, prefix="/api")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Requisição recebida: {request.method} {request.url}")
    response = await call_next(request)
    return response

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "API funcionando! Acesse /api para usar as rotas da aplicação."
    }