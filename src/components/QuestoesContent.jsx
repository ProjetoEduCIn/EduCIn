
import { useOutletContext } from "react-router-dom";

const QuestoesContent = () => {
  const { materiaisExtras } = useOutletContext();
  const questoes = materiaisExtras.filter((item) => item.tipo === "questao");

  return (
    <div className="questoes-content">
      

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
