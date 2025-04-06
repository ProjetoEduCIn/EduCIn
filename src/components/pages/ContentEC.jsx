import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { disciplinaService } from "../../services/apiService";
import "@styles/index.css";
import "@styles/PaginaInicial.css";
import "@styles/reset.css";
import { motion } from "framer-motion";

const ContentEC = () => {
  const [disciplinas, setDisciplinas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const curso = "EC"; // Identificador para Engenharia da Computação

  useEffect(() => {
    const fetchDisciplinas = async () => {
      setLoading(true);
      try {
        // Por enquanto, carregaremos apenas os 2 primeiros períodos (conforme seu arquivo atual)
        const periodos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const disciplinasPorPeriodo = {};

        for (const periodo of periodos) {
          try {
            const disciplinasDoPeriodo =
              await disciplinaService.listarDisciplinasPorCurso(curso, periodo);
            disciplinasPorPeriodo[periodo] = disciplinasDoPeriodo;
          } catch (err) {
            console.error(`Erro ao carregar período ${periodo}:`, err);
            // Fallback para dados locais
            disciplinasPorPeriodo[periodo] = getFallbackDisciplinas(periodo);
          }
        }

        setDisciplinas(disciplinasPorPeriodo);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar disciplinas:", err);
        setError(
          "Não foi possível carregar as disciplinas. Usando dados locais."
        );
        setDisciplinas(getAllFallbackDisciplinas());
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplinas();
  }, [curso]);

  // Função para obter os dados fallback caso a API falhe
  const getFallbackDisciplinas = (periodo) => {
    const fallbackData = {
      1: [
        {
          id: "ip-ec",
          nome: "Introdução à Programação",
          imagem: "/imagens/ImagemLivro.jpg",
        },
        {
          id: "sd-ec",
          nome: "Sistemas Digitais",
          imagem: "/imagens/ImagemLivro.jpg",
        },
        {
          id: "cad-ec",
          nome: "Concepção de Artefatos Digitais",
          imagem: "/imagens/ImagemLivro.jpg",
        },
        {
          id: "md-ec",
          nome: "Matemática Discreta",
          imagem: "/imagens/ImagemLivro.jpg",
        },
      ],
      2: [
        {
          id: "edoo-ec",
          nome: "Estrutura De Dados Orientada a Objetos",
          imagem: "/imagens/ImagemLivro.jpg",
        },
        {
          id: "ds-ec",
          nome: "Desenvolvimento de Software",
          imagem: "/imagens/ImagemLivro.jpg",
        },
        {
          id: "acso-ec",
          nome: "Arquitetura de Computadores e Sistemas Operacionais",
          imagem: "/imagens/ImagemLivro.jpg",
        },
        {
          id: "calc1-ec",
          nome: "Cálculo 1",
          imagem: "/imagens/ImagemLivro.jpg",
        },
      ],
    };

    return fallbackData[periodo] || [];
  };

  const getAllFallbackDisciplinas = () => {
    const periodos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = {};
    periodos.forEach((periodo) => {
      result[periodo] = getFallbackDisciplinas(periodo);
    });
    return result;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando disciplinas...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {error && <div className="error-message">{error}</div>}

      <h3 className="periodo">1° Período</h3>
      <div className="cadeiras">
        {disciplinas[1]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>

      
      
      <h3 className="periodo">2° Período</h3>
      <div className="cadeiras">
        {disciplinas[2]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>



      <h3 className="periodo">3° Período</h3>
      <div className="cadeiras">
        {disciplinas[3]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>


      <h3 className="periodo">4° Período</h3>
      <div className="cadeiras">
        {disciplinas[4]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>


      <h3 className="periodo">5° Período</h3>
      <div className="cadeiras">
        {disciplinas[5]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>


      <h3 className="periodo">6° Período</h3>
      <div className="cadeiras">
        {disciplinas[6]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>

      <h3 className="periodo">7° Período</h3>
      <div className="cadeiras">
        {disciplinas[7]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>


      <h3 className="periodo">8° Período</h3>
      <div className="cadeiras">
        {disciplinas[8]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>


      <h3 className="periodo">9° Período</h3>
      <div className="cadeiras">
        {disciplinas[9]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>

      <h3 className="periodo">10° Período</h3>
      <div className="cadeiras">
        {disciplinas[10]?.map((disciplina) => (
          <Link
            key={disciplina.id}
            className="Card"
            to={`/disciplina/${disciplina.nome.replace(/\s+/g, "-").toLowerCase()}/video`}
          >
            <img
              src={disciplina.imagem || "/imagens/ImagemLivro.jpg"}
              alt="Livro"
            />
            <div className="Inferior">
              <p>{disciplina.nome}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default ContentEC;
