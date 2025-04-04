import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Content from "./components/pages/Content";
import ContentCC from "./components/pages/ContentCC";
import ContentEC from "./components/pages/ContentEC";
import DisciplinaPage from "./components/pages/DisciplinaPage";
import VideoContent from "./components/VideoContent";
import QuestoesContent from "./components/pages/QuestoesContent";
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

function AnimatedRoutes() {
  const location = useLocation();
  const [disciplinas, setDisciplinas] = useState(disciplinasFallback);

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
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Main />} />
        <Route path="/si" element={<Content />} />
        <Route path="/cc" element={<ContentCC />} />
        <Route path="/ec" element={<ContentEC />} />

        {/* Rota dinâmica para qualquer disciplina */}
        <Route
          path="/:disciplinaNome/*"
          element={<DynamicDisciplinaRoute disciplinas={disciplinas} />}
        />
      </Routes>
    </AnimatePresence>
  );
}

// Componente para lidar com rotas dinâmicas de disciplinas
function DynamicDisciplinaRoute({ disciplinas }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [disciplina, setDisciplina] = useState(null);
  const [conteudo, setConteudo] = useState([]);

  const disciplinaNome = location.pathname.split("/")[1]; // Obtém 'sistemas-digitais' de '/sistemas-digitais/video'

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
        <Header currentPage="content" />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
