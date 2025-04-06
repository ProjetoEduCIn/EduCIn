import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Content from "./components/pages/Content";
import ContentCC from "./components/pages/ContentCC";
import ContentEC from "./components/pages/ContentEC";
import DisciplinaPage from "./components/pages/DisciplinaPage";
import VideoContent from "./components/VideoContent";
import QuestoesContent from "./components/QuestoesContent";
import SlidesContent from "./components/SlidesContent";
import LinksContent from "./components/LinksContent";
import "@styles/index.css";
import { AnimatePresence } from "framer-motion";
import { disciplinaService } from "./services/apiService";

// Mantenha algumas disciplinas estáticas para fallback
const disciplinasFallback = [
  {
    nome: "Sistemas Digitais",
    conteudo: [
      { tipo: "video", link: "video-link.mp4" },
      { tipo: "questao", descricao: "Questão 1" },
      { tipo: "slide", link: "slide-link.pdf" },
      { tipo: "link", descricao: "Link 1", link: "http://example.com" },
      {
        tipo: "prova",
        nome: "Prova I - 2024.2",
        visualizarLink: "#",
        baixarLink: "#",
      },
    ],
  },
  // Adicione mais disciplinas conforme necessário
];

// Componente para determinar se o usuário está autenticado
function useAuth() {
  // Verifica se existe um token de acesso no localStorage
  return localStorage.getItem("access_token") !== null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const [disciplinas, setDisciplinas] = useState(disciplinasFallback);
  const isAuthenticated = useAuth();

  // Determinar a página atual com base no caminho
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "login";
    if (["/si", "/cc", "/ec"].includes(path)) return "content";
    if (path.startsWith("/disciplina/")) return "content";
    return "login";
  };

  const currentPage = getCurrentPage();

  useEffect(() => {
    // Função para carregar todas as disciplinas ao iniciar a aplicação
    const carregarDisciplinas = async () => {
      try {
        const todasDisciplinas =
          await disciplinaService.listarTodasDisciplinas();
        // Transformar os dados para o formato esperado
        const disciplinasFormatadas = [];

        // Processar disciplinas por período
        Object.values(todasDisciplinas).forEach((periodos) => {
          periodos.forEach((disciplina) => {
            // Carregar detalhes de cada disciplina
            disciplinasFormatadas.push({
              id: disciplina.id,
              nome: disciplina.nome,
              // Conteúdo vazio inicial, será carregado quando a página da disciplina for acessada
              conteudo: [],
            });
          });
        });

        setDisciplinas([...disciplinasFallback, ...disciplinasFormatadas]);
      } catch (error) {
        console.error("Erro ao carregar disciplinas para rotas:", error);
        // Manter fallback em caso de erro
      }
    };

    carregarDisciplinas();
  }, []);

  return (
    <>
      <Header currentPage={currentPage} isAuthenticated={isAuthenticated} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Main />} />
          <Route
            path="/si"
            element={isAuthenticated ? <Content /> : <Navigate to="/" />}
          />
          <Route
            path="/cc"
            element={isAuthenticated ? <ContentCC /> : <Navigate to="/" />}
          />
          <Route
            path="/ec"
            element={isAuthenticated ? <ContentEC /> : <Navigate to="/" />}
          />

          {/* Nova rota padronizada */}
          <Route
            path="/disciplina/:disciplinaNome"
            element={isAuthenticated ? <DisciplinaPage /> : <Navigate to="/" />}
          >
            <Route path="video" element={<VideoContent />} />
            <Route path="questoes" element={<QuestoesContent />} />
            <Route path="slides" element={<SlidesContent />} />
            <Route path="links" element={<LinksContent />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

// Componente para lidar com rotas dinâmicas de disciplinas
function DynamicDisciplinaRoute({ disciplinas }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [disciplina, setDisciplina] = useState(null);
  const [conteudo, setConteudo] = useState([]);

  const disciplinaNome = location.pathname.split("/")[2]; // Obtém 'sistemas-digitais' de '/sistemas-digitais/video'

  useEffect(() => {
    const carregarDetalhes = async () => {
      setLoading(true);

      // Primeiro, verificamos se já temos essa disciplina em nossa lista estática
      const disciplinaEncontrada = disciplinas.find(
        (d) => d.nome.replace(/\s+/g, "-").toLowerCase() === disciplinaNome
      );

      if (disciplinaEncontrada) {
        // Se já temos a disciplina, usamos seus dados
        setDisciplina(disciplinaEncontrada);
        setConteudo(disciplinaEncontrada.conteudo);
      } else {
        // Caso contrário, tentamos carregar os dados da API
        try {
          // Converter o slug para um nome legível
          const nomeFormatado = disciplinaNome
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          // Aqui você pode buscar o ID da disciplina pelo nome ou usar outra lógica
          // Este é um exemplo simples:
          const detalhesDisciplina = await disciplinaService.obterDetalhes(
            disciplinaNome
          );
          const conteudoDisciplina = await disciplinaService.obterConteudo(
            disciplinaNome
          );

          setDisciplina({
            nome: nomeFormatado,
            ...detalhesDisciplina,
          });

          setConteudo(conteudoDisciplina);
        } catch (error) {
          console.error("Erro ao carregar detalhes da disciplina:", error);
          // Falback para um conteúdo vazio
          setDisciplina({ nome: disciplinaNome.replace(/-/g, " ") });
          setConteudo([]);
        }
      }

      setLoading(false);
    };

    carregarDetalhes();
  }, [disciplinaNome, disciplinas]);

  if (loading) {
    return <div className="loading">Carregando conteúdo...</div>;
  }

  // Extrair a parte final do path (video, questoes, etc)
  const subPath = location.pathname.split("/")[2] || "video";

  // Renderizar o componente apropriado baseado na rota
  switch (subPath) {
    case "video":
      return <VideoContent conteudo={conteudo} />;
    case "questoes":
      return <QuestoesContent conteudo={conteudo} />;
    case "slides":
      return <SlidesContent conteudo={conteudo} />;
    case "links":
      return <LinksContent conteudo={conteudo} />;
    default:
      // Rota base da disciplina - neste caso também renderizamos o vídeo
      return (
        <DisciplinaPage
          nomeDisciplina={disciplina?.nome || disciplinaNome.replace(/-/g, " ")}
          conteudo={conteudo}
        />
      );
  }
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
