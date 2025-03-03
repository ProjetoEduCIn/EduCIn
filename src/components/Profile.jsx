import { useState } from "react";
import "@styles/Profile.css";

const Profile = ({ onPageChange }) => {
  const [selecionado, setSelecionado] = useState("");

  const opcoes = [
    "Professor",
    "Aluno",
  ];

  return (
    <div className="container">
      <div className="logo"></div>
      <h1>Qual seu cargo no CIn?</h1>
      <p>Escolha dentre as opções abaixo:</p>
      <div className="button-container">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            className={`button ${selecionado === opcao ? "selected" : ""}`}
            onClick={() => setSelecionado(opcao)}
          >
            {opcao}
          </button>
        ))}
      </div>
      <div className="progress-bar">
        <div className="filled"></div>
        <div className="empty"></div>
      </div>
      {/* O botão agora chama a função onPageChange para mudar de tela */}
      <button className="continue-button" onClick={() => onPageChange("profile2")}>
        Continuar
      </button>
    </div>
  );
};

export default Profile;
