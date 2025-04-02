import "@styles/Profile.css";
import"@styles/index.css";

function EsqueceuSenha() {
  return (
    <div className="container">
  
      <form className="perguntas">
      <div className="email-inserido">
      <h1>email Cin</h1>
      <button className="button">fazer login com google</button>
      </div>
      <h1>nova senha</h1>
      <input placeholder="senha" name="senha" type="password"></input>
     <button className="continue-button" onClick={() => onPageChange("login")}>
        Continuar
      </button>
      </form>
    
  </div>
  );
}

export default EsqueceuSenha;
