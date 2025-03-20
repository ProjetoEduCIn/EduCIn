import "@styles/Profile.css";
import"@styles/index.css";

function EsqueceuSenha() {
  return (
    <>
      <form className="Formulario">
      
        <h1>Email CIn</h1>
        <button >fazer login com google</button>

        <p>Nova Senha:</p>
        <input placeholder="Digite sua nova senha" name="senha" type="password"></input>
        
        <button 
          className="continue-button" 
          onClick={() => onPageChange("login")}>
          Continuar
        </button>
      </form>
    
  </>
  );
}

export default EsqueceuSenha;
