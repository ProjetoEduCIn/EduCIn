"""
repositories.py
Define as interfaces (contratos) de repositório
que a camada de infraestrutura deve implementar.
"""

from abc import ABC, abstractmethod
from typing import Optional, List
from domain.entities import Aluno, Periodo, Cadeira, Aula, Arquivo

class IAlunoRepository(ABC):
    @abstractmethod
    def save(self, aluno: Aluno) -> Aluno:
        pass

    @abstractmethod
    def find_by_email(self, email: str) -> Optional[Aluno]:
        pass


class IPeriodoRepository(ABC):
    @abstractmethod
    def find_all_by_curso(self, curso: str) -> List[Periodo]:
        pass

    @abstractmethod
    def save(self, periodo: Periodo) -> Periodo:
        pass


class ICadeiraRepository(ABC):
    @abstractmethod
    def find_by_periodo(self, periodo_id: str) -> List[Cadeira]:
        pass

    @abstractmethod
    def save(self, cadeira: Cadeira) -> Cadeira:
        pass


class IAulaRepository(ABC):
    @abstractmethod
    def save(self, aula: Aula) -> Aula:
        pass


class IArquivoRepository(ABC):
    @abstractmethod
    def save(self, arquivo: Arquivo) -> Arquivo:
        pass
