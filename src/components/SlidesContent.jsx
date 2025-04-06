import React from "react";
import { useOutletContext } from "react-router-dom";

const SlidesContent = () => {
  const { conteudo, materiaisExtras } = useOutletContext();
  const slides = materiaisExtras.filter((item) => item.tipo === "slide");

  return (
    <div className="slides-content">
      <div className="topicos-section">
        <h3>Tópicos da disciplina</h3>
        {conteudo.topicos && conteudo.topicos.length > 0 ? (
          <ul className="topicos-lista">
            {conteudo.topicos.map((topico, index) => (
              <li key={index}>{topico}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhum tópico disponível para esta disciplina.</p>
        )}
      </div>

      <div className="slides-section">
        <h3>Slides das aulas</h3>
        {slides.length > 0 ? (
          <div className="slides-lista">
            {slides.map((slide, index) => (
              <div key={index} className="slide-item">
                <h4>{slide.nome}</h4>
                <iframe
                  src={slide.link}
                  title={slide.nome}
                  className="slide-viewer"
                  allowFullScreen
                ></iframe>
                <a href={slide.link} target="_blank" rel="noopener noreferrer">
                  Abrir em uma nova aba
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum slide disponível para esta disciplina.</p>
        )}
      </div>
    </div>
  );
};

export default SlidesContent;
