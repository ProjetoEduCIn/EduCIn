import { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar.jsx";
import "@styles/DisciplinaPage.css";

const DisciplinaPage = ({ nomeDisciplina, conteudo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const conteudos = conteudo.filter((item) => item.tipo !== "prova");
  const provas = conteudo
    .filter((item) => item.tipo === "prova")
    .map((prova) => ({
      periodo: prova.nome.split(" - ")[1],
      link: prova.visualizarLink,
    }));

  // Extrair o slug da disciplina da URL atual
  const disciplinaSlug = location.pathname.split("/")[2];

  useEffect(() => {
    if (location.pathname === `/disciplina/${disciplinaSlug}`) {
      navigate(`/disciplina/${disciplinaSlug}/video`);
    }
  }, [location.pathname, navigate, disciplinaSlug]);

  return (
    <div className="disciplina-page">
      <Sidebar conteudos={conteudos} provas={provas} />
      <div className="conteudo">
        <h2>{nomeDisciplina}</h2>
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
        <div className="conteudo-list">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DisciplinaPage;
