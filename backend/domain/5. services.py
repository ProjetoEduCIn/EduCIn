# """
# services.py
# Onde ficam as regras de negócio principais (DDD).
# """

# from .entities import Aluno
# from .repositories import IAlunoRepository
# from typing import Optional

# class ServicoAluno:
#     """
#     Responsável por regras de negócio relacionadas a Aluno.
#     """
#     def __init__(self, repositorio_aluno: IAlunoRepository):
#         self.repositorio_aluno = repositorio_aluno

#     def cadastrar_aluno(self, aluno: Aluno) -> Aluno:
#         """
#         Só cadastra se o domínio de e-mail for @cin.ufpe.br.
#         """
#         if not aluno.email.endswith("@cin.ufpe.br"):
#             raise ValueError("Somente alunos com email @cin.ufpe.br podem acessar.")
#         return self.repositorio_aluno.save(aluno)

#     def buscar_por_email(self, email: str) -> Optional[Aluno]:
#         return self.repositorio_aluno.find_by_email(email)
