import React from "react";
import { useOutletContext } from "react-router-dom";

const LinksContent = () => {
  const { conteudo, materiaisExtras } = useOutletContext();
  const linksExtras = materiaisExtras.filter((item) => item.tipo === "link");

  return (
    <div className="links-content">


      <div className="links-section">
        <h3>Material de apoio</h3>
        {conteudo.links && conteudo.links.length > 0 ? (
          <div className="material-lista">
            <ul className="links-lista">
              {conteudo.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Nenhum material de apoio disponível para esta disciplina.</p>
        )}
      </div>

      {linksExtras.length > 0 && (
        <div className="links-adicionais-section">
          <h3>Links adicionais</h3>
          <ul className="links-adicionais-lista">
            {linksExtras.map((link, index) => (
              <li key={index}>
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.nome} - {link.descricao}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LinksContent;
