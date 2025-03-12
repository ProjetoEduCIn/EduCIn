import { useState } from "react";
import "@styles/Profile.css";

const Profile = ({ onPageChange }) => {
  const [selecionado, setSelecionado] = useState("");

  const opcoes = [];

  return (
    <div>
        <form className="perguntas">

            <h1>Registro</h1>
            <p className="Legenda">Como deseja ser chamado?</p>
            <input name="Apelido" type="text" />

            <p className="Legenda">Email CIn:</p>
            <button className="button">fazer login com google</button> {/* PARA LETS FIGUEIROA */}

            <p className="Legenda">Senha:</p>
            <input name="senha" type="password"></input>
            {/* O botão agora chama a função onPageChange para mudar de tela */}
            <button className="button" onClick={() => onPageChange("profile2")}>
              Continuar
            </button>
        </form>
    </div>
  );
};

export default Profile;