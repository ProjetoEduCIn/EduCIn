from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "API funcionando!"}

@router.get("/cursos")
def listar_cursos():
    """
    Lista todos os cursos disponíveis
    """
    return [
        {"id": "SI", "nome": "Sistemas de Informação"},
        {"id": "CC", "nome": "Ciência da Computação"},
        {"id": "EC", "nome": "Engenharia da Computação"}
    ]

@router.get("/cursos/{curso_id}/disciplinas")
def listar_disciplinas_por_curso(curso_id: str, periodo: Optional[int] = None):
    """
    Lista disciplinas de um curso, opcionalmente filtrado por período
    """
    # Dados mockados
    disciplinas = {
        "SI": {
            1: [
                {"id": "sd", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ip", "nome": "Introdução a Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            2: [
                {"id": "edoo", "nome": "Estrutura De Dados Orientada a Objetos", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ds", "nome": "Desenvolvimento de Software", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "acso", "nome": "Arquitetura de Computadores e Sistemas Operacionais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "calc1", "nome": "Cálculo 1", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
        },
        "EC": {
            1: [
                {"id": "ip-ec", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "sd-ec", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad-ec", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md-ec", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            2: [
                {"id": "edoo-ec", "nome": "Estrutura De Dados Orientada a Objetos", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ds-ec", "nome": "Desenvolvimento de Software", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "acso-ec", "nome": "Arquitetura de Computadores e Sistemas Operacionais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "calc1-ec", "nome": "Cálculo 1", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
        },
        "CC": {
            1: [
                {"id": "ip-cc", "nome": "Introdução à Programação", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "sd-cc", "nome": "Sistemas Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "cad-cc", "nome": "Concepção de Artefatos Digitais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "md-cc", "nome": "Matemática Discreta", "imagem": "/imagens/ImagemLivro.jpg"}
            ],
            2: [
                {"id": "edoo-cc", "nome": "Estrutura De Dados Orientada a Objetos", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "ds-cc", "nome": "Desenvolvimento de Software", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "acso-cc", "nome": "Arquitetura de Computadores e Sistemas Operacionais", "imagem": "/imagens/ImagemLivro.jpg"},
                {"id": "calc1-cc", "nome": "Cálculo 1", "imagem": "/imagens/ImagemLivro.jpg"}
            ]
        }
    }
    
    if curso_id not in disciplinas:
        raise HTTPException(status_code=404, detail=f"Curso {curso_id} não encontrado")
        
    if periodo is not None:
        return disciplinas.get(curso_id, {}).get(periodo, [])
        
    # Se não especificou período, retorna todas as disciplinas do curso
    todas_disciplinas = []
    for periodo_disciplinas in disciplinas.get(curso_id, {}).values():
        todas_disciplinas.extend(periodo_disciplinas)
    return todas_disciplinas

@router.get("/disciplinas/{disciplina_id}")
def obter_disciplina(disciplina_id: str):
    """
    Obtém detalhes de uma disciplina específica
    """
    # Dados mockados
    disciplinas = {
        "ip": {
            "id": "ip",
            "nome": "Introdução à Programação",
            "codigo": "IP101",
            "descricao": "Curso introdutório aos conceitos de programação e algoritmos",
            "cargaHoraria": 90,
            "professores": ["Prof. João Silva", "Profa. Maria Oliveira"]
        },
        "sd": {
            "id": "sd",
            "nome": "Sistemas Digitais",
            "codigo": "SD202",
            "descricao": "Estudo dos fundamentos de sistemas digitais e lógica booleana",
            "cargaHoraria": 60,
            "professores": ["Prof. Carlos Pereira"]
        }
    }
    
    if disciplina_id not in disciplinas:
        raise HTTPException(status_code=404, detail=f"Disciplina {disciplina_id} não encontrada")
    
    return disciplinas[disciplina_id]

@router.get("/disciplinas/{disciplina_id}/conteudo")
def obter_conteudo_disciplina(disciplina_id: str):
    """
    Obtém o conteúdo de uma disciplina específica
    """
    # Dados mockados
    conteudos = {
        "ip": {
            "topicos": [
                "Algoritmos e lógica de programação",
                "Tipos de dados e variáveis",
                "Estruturas de controle",
                "Funções e procedimentos",
                "Vetores e matrizes"
            ],
            "links": [
                {"url": "https://example.com/material1", "texto": "Material de apoio 1"},
                {"url": "https://example.com/material2", "texto": "Material de apoio 2"}
            ]
        },
        "sd": {
            "topicos": [
                "Sistemas de numeração",
                "Álgebra booleana",
                "Portas lógicas",
                "Circuitos combinacionais",
                "Circuitos sequenciais"
            ],
            "links": [
                {"url": "https://example.com/sd-material1", "texto": "Slides da disciplina"},
                {"url": "https://example.com/sd-material2", "texto": "Exercícios"}
            ]
        }
    }
    
    if disciplina_id not in conteudos:
        raise HTTPException(status_code=404, detail=f"Conteúdo para disciplina {disciplina_id} não encontrado")
    
    return conteudos[disciplina_id]