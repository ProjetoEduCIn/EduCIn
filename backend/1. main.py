"""
main.py
Ponto de entrada da aplicação FastAPI.
Carrega rotas, middlewares (CORS) e inicia a aplicação.
"""

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.application.controllers import router as api_router
from app.database import init_db

def create_app() -> FastAPI:
    app = FastAPI(title="Sistema Educacional DDD")

    # Configurar CORS (para permitir acesso do React)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Em produção, especifique domínios confiáveis
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Iniciar banco de dados
    init_db()

    # Incluir as rotas da aplicação
    app.include_router(api_router, prefix="/api")

    return app

app = create_app()

