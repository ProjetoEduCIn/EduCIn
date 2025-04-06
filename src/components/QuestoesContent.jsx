import React from "react";
import { useOutletContext } from "react-router-dom";

const QuestoesContent = () => {
  const { conteudo, materiaisExtras } = useOutletContext();
  const questoes = materiaisExtras.filter((item) => item.tipo === "questao");

  return (
    <div className="questoes-content">
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

      <div className="questoes-section">
        <h3>Exercícios e listas</h3>
        {questoes.length > 0 ? (
          <div className="questoes-lista">
            {questoes.map((questao, index) => (
              <div key={index} className="questao-item">
                <h4>{questao.nome}</h4>
                <p>{questao.descricao}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma lista de exercícios disponível para esta disciplina.</p>
        )}
      </div>
    </div>
  );
};

export default QuestoesContent;
