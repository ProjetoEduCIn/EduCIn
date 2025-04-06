import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "@styles/Header.css";

const Header = ({ isAuthenticated }) => {
  const location = useLocation(); // Obtém o caminho atual

  const isDisciplinaPage = location.pathname.includes("disciplina"); // Verifica se está na página "disciplina"
  const isLoginPage = location.pathname.includes("login"); // Verifica se está na página "login"

  // Verifica se está em uma das rotas específicas para exibir os cursos
  const isContentPage =
    location.pathname === "/si" 
    location.pathname === "/ec" 
    location.pathname === "/cc";

  return (
    <motion.header
      className="flex header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Link className="img" to="/si"> {/* Redireciona sempre para /content */}
        <img
          style={{ height: "90%", marginLeft: "0.5%" }}
          src="/imagens/ImagemHeader.png"
          alt="Logo"
        />
      </Link>
      {isAuthenticated && isContentPage && ( // Mostra os links apenas nas páginas específicas
        <nav>
          <ul>
            <li>
              <Link to="/si" className="link">
                Sistemas de Informação
              </Link>
            </li>
            <li>
              <Link to="/cc" className="link">
                Ciência da Computação
              </Link>
            </li>
            <li>
              <Link to="/ec" className="link">
                Engenharia da Computação
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </motion.header>
  );
};

export default Header;