import axios from 'axios';

// Crie uma instância do axios com configurações base
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Adicione o serviço de alunos
export const alunoService = {
  login: async (email, senha) => {
    try {
      // Tenta fazer login pela API
      const response = await api.post('/alunos/login', { email, senha });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      
      // Modo de desenvolvimento - simula login bem-sucedido para testes
      if (process.env.NODE_ENV === 'development') {
        console.log("Usando modo de desenvolvimento para login");
        return {
          token: 'dev-token-123',
          user: {
            id: '1',
            nome: 'Usuário de Teste',
            email: email,
            curso: email.includes('ec') ? 'EC' : email.includes('cc') ? 'CC' : 'SI'
          }
        };
      }
      
      throw error;
    }
  },
  
  cadastrar: async (nome, email, senha, curso) => {
    try {
      // Tenta cadastrar pela API
      const response = await api.post('/alunos', { nome, email, senha, curso });
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      
      // Modo de desenvolvimento - simula cadastro bem-sucedido para testes
      if (process.env.NODE_ENV === 'development') {
        console.log("Usando modo de desenvolvimento para cadastro");
        return {
          id: '1',
          nome: nome,
          email: email,
          curso: curso
        };
      }
      
      throw error;
    }
  },
  checkFirstAccess: async (email) => {
    try {
        const response = await api.get(`/alunos/check-email/${email}`);
        return response.data.isFirstAccess;
    } catch (error) {
        console.error('Erro ao verificar primeiro acesso:', error);
        
        // Modo de desenvolvimento - simula primeiro acesso para testes
        if (process.env.NODE_ENV === 'development') {
            console.log("Usando modo de desenvolvimento para verificação de primeiro acesso");
            return true; // Em desenvolvimento, sempre considera primeiro acesso
        }
        
        throw error;
    }
}

};



// Serviços relacionados a disciplinas
export const disciplinaService = {
  listarDisciplinasPorCurso: async (cursoId, periodo) => {
    try {
      const response = await api.get(`/cursos/${cursoId}/disciplinas?periodo=${periodo}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao listar disciplinas do curso ${cursoId} (periodo ${periodo}):`, error);
      throw error;
    }
  },
  
  obterDetalhes: async (disciplinaId) => {
    try {
      const response = await api.get(`/disciplinas/${disciplinaId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter detalhes da disciplina ${disciplinaId}:`, error);
      throw error;
    }
  },
  
  obterConteudo: async (disciplinaId) => {
    try {
      const response = await api.get(`/disciplinas/${disciplinaId}/conteudo`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter conteúdo da disciplina ${disciplinaId}:`, error);
      throw error;
    }
  }
};

// Serviços relacionados a cursos
export const cursoService = {
  listarCursos: async () => {
    try {
      const response = await api.get('/cursos');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      throw error;
    }
  }
};

export default api;