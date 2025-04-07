import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar.jsx";
import { disciplinaService } from "../../services/apiService";
import "@styles/DisciplinaPage.css";

const DisciplinaPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [disciplina, setDisciplina] = useState({});
  const [conteudo, setConteudo] = useState({
    topicos: [],
    links: [],
  });
  const [materiaisExtras, setMateriaisExtras] = useState([]);
  const [error, setError] = useState(null);

  // Extrair o slug da disciplina da URL atual
  const disciplinaSlug = location.pathname.split("/")[2];

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        // Carregar detalhes da disciplina
        const detalhesDisciplina = await disciplinaService.obterDetalhes(
          disciplinaSlug
        );
        setDisciplina(detalhesDisciplina);

        // Carregar conteúdo da disciplina
        const conteudoDisciplina = await disciplinaService.obterConteudo(
          disciplinaSlug
        );
        console.log("Conteúdo carregado:", conteudoDisciplina);
        setConteudo(conteudoDisciplina);

        // Exemplo de materiais adicionais (poderia vir de outra API no futuro)
        setMateriaisExtras([
          {
            tipo: "video",
            nome: "Introdução à Disciplina",
            link: "https://example.com/intro.mp4",
          },
          {
            tipo: "video",
            nome: "Conceitos Fundamentais",
            link: "https://example.com/fundamentos.mp4",
          },
          {
            tipo: "questao",
            nome: "Lista de Exercícios 1",
            descricao: "Exercícios sobre conceitos básicos",
          },
          {
            tipo: "slide",
            nome: "Slides Aula 1",
            link: "https://example.com/slides1.pdf",
          },
          {
            tipo: "prova",
            nome: "Prova 1 - 2024.1",
            periodo: "2024.1",
            visualizarLink: "#",
          },
        ]);

        setError(null);
      } catch (err) {
        console.error("Erro ao carregar dados da disciplina:", err);
        setError("Não foi possível carregar os dados da disciplina.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();

    // Redireciona para a página de vídeo se estiver na raiz da disciplina
    if (location.pathname === `/disciplina/${disciplinaSlug}`) {
      navigate(`/disciplina/${disciplinaSlug}/video`);
    }
  }, [disciplinaSlug, navigate, location.pathname]);

  // Filtrar provas dos materiais extras para exibir na sidebar
  const provas = materiaisExtras
    .filter((item) => item.tipo === "prova")
    .map((prova) => ({
      periodo: prova.periodo,
      link: prova.visualizarLink,
      nome: prova.nome,
    }));

  if (loading) {
    return (
      <div className="loading-container">
        Carregando conteúdo da disciplina...
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="disciplina-page">
      <Sidebar conteudos={materiaisExtras} provas={provas} />
      <div className="conteudo">
        <h2>{disciplina.nome || disciplinaSlug.replace(/-/g, " ")}</h2>
        {disciplina.codigo && (
          <p className="disciplina-codigo">Código: {disciplina.codigo}</p>
        )}
        {disciplina.descricao && (
          <p className="disciplina-descricao">{disciplina.descricao}</p>
        )}

        <motion.nav
          className="conteudo-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Link to={`/disciplina/${disciplinaSlug}/video`}>Vídeo</Link>
          <Link to={`/disciplina/${disciplinaSlug}/questoes`}>Questões</Link>
          <Link to={`/disciplina/${disciplinaSlug}/slides`}>Slides</Link>
          <Link to={`/disciplina/${disciplinaSlug}/links`}>Links</Link>
        </motion.nav>

        <div className="conteudo-list alinhado-esquerda">
        <Outlet context={{ conteudo, materiaisExtras }} />
        </div>
      </div>
    </div>
  );
};

export default DisciplinaPage;
