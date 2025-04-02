import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Adiciona configurações para CORS
});

// Interceptores com melhor tratamento de erro
api.interceptors.request.use(
  (request) => {
    console.log("Detalhes da Requisição:", {
      método: request.method,
      url: request.url,
      dados: request.data,
      headers: request.headers,
    });
    return request;
  },
  (error) => {
    console.error("Erro na requisição:", {
      mensagem: error.message,
      código: error.code,
      config: error.config,
    });
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Detalhes da Resposta:", {
      status: response.status,
      dados: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.error("Erro detalhado na resposta:", {
      mensagem: error.message,
      status: error.response?.status,
      dados: error.response?.data,
      headers: error.response?.headers,
    });
    return Promise.reject(error);
  }
);

// Serviços relacionados a alunos
export const alunoService = {
  login: async (email, senha) => {
    try {
      const response = await api.post("/alunos/login", { email, senha });
      return response.data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  googleLogin: async (token) => {
    try {
      console.log(
        "Iniciando login com Google. Token recebido:",
        token.substring(0, 20) + "..."
      );

      const response = await api.post("/auth/google", { token });

      console.log("Login com Google bem-sucedido:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro detalhado no login Google:", {
        mensagem: error.message,
        resposta: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      throw error;
    }
  },

  checkFirstAccess: async (email) => {
    try {
      const response = await api.get(
        `/alunos/check-first-access?email=${encodeURIComponent(email)}`
      );
      return response.data.isFirstAccess;
    } catch (error) {
      console.error("Erro ao verificar primeiro acesso:", error);
      throw error;
    }
  },

  completarCadastro: async (dadosAluno) => {
    try {
      const response = await api.post("/first-access", dadosAluno);
      return response.data;
    } catch (error) {
      console.error("Erro ao completar cadastro:", error);
      throw error;
    }
  },
};

// Serviços relacionados a disciplinas
export const disciplinaService = {
  listarDisciplinasPorCurso: async (cursoId, periodo) => {
    try {
      const response = await api.get(`/cursos/${cursoId}/disciplinas`, {
        params: { periodo },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao listar disciplinas:", error);
      throw error;
    }
  },

  obterDetalhes: async (disciplinaId) => {
    try {
      const response = await api.get(`/disciplinas/${disciplinaId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter detalhes:", error);
      throw error;
    }
  },

  obterConteudo: async (disciplinaId) => {
    try {
      const response = await api.get(`/disciplinas/${disciplinaId}/conteudo`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter conteúdo:", error);
      throw error;
    }
  },
};

// Serviços relacionados a cursos
export const cursoService = {
  listarCursos: async () => {
    try {
      const response = await api.get("/cursos");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      throw error;
    }
  },
};

export default api;