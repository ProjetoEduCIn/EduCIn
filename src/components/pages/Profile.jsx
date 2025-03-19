import { useState } from "react";
import { alunoService } from "../../services/apiService";
import "@styles/Profile.css";

const Profile = ({ onPageChange }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validações básicas
    if (!nome || !email || !senha) {
      setError("Todos os campos são obrigatórios");
      return;
    }
    
    if (!email.endsWith("@cin.ufpe.br")) {
      setError("Use um email @cin.ufpe.br válido");
      return;
    }
    
    try {
      setLoading(true);
      await alunoService.cadastrar(nome, email, senha, ""); // Curso será definido na próxima etapa
      onPageChange("profile2");
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError("Erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="perguntas" onSubmit={handleSubmit}>
        <h1>Registro</h1>
        {error && <p className="error-message">{error}</p>}
        
        <p className="Legenda">Como deseja ser chamado?</p>
        <input 
          name="Apelido" 
          type="text" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <p className="Legenda">Email CIn:</p>
        <input 
          name="email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button">fazer login com google</button>

        <p className="Legenda">Senha:</p>
        <input 
          name="senha" 
          type="password" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        <button 
          className="button" 
          type="submit" 
          disabled={loading}
        >
          {loading ? "Enviando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
};

export default Profile;