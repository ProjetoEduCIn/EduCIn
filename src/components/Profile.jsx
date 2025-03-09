import { useState } from "react";
import "@styles/Profile.css";

const Profile = ({ onPageChange }) => {
  const [selecionado, setSelecionado] = useState("");

  const opcoes = [];

  return (
    <div className="container">
  
      <form className="perguntas">
      <h1>Como deseja ser chamado?</h1>
      <input placeholder="apelido" name="Apelido" type="text" />
      <div className="email-inserido">
      <h1>email Cin</h1>
      <button className="button">fazer login com google</button>
      </div>
      <h1>senha</h1>
      <input placeholder="senha" name="senha" type="password"></input>
     {/* O botão agora chama a função onPageChange para mudar de tela */}
     <button className="continue-button" onClick={() => onPageChange("profile2")}>
        Continuar
      </button>
      </form>
    
      
    </div>
  );
};

export default Profile;