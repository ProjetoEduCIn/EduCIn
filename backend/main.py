from database import init_db
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware
from application.controllers import router
import logging

init_db()

app = FastAPI(title="Sistema Educacional")

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # Em produção, especifique domínios confiáveis
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir roteador de API
app.include_router(router, prefix="/api")

logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Requisição recebida: {request.method} {request.url}")
    response = await call_next(request)
    return response

# Rota raiz para teste
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "API funcionando! Acesse /api para usar as rotas da aplicação."
    }