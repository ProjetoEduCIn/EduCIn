import { useState } from "react";
import { alunoService } from "../../services/apiService";
import "@styles/Profile.css";

const Profile = ({ onPageChange }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
<<<<<<< Updated upstream
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
=======
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [curso, setCurso] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [senhaErrors, setSenhaErrors] = useState({
    length: true,
    uppercase: true,
    lowercase: true,
    number: true,
    special: true,
    match: true,
  });
  const validatePassword = (password) => {
    const errors = {
      length: password.length < 8,
      uppercase: !/[A-Z]/.test(password),
      lowercase: !/[a-z]/.test(password),
      number: !/[0-9]/.test(password),
      special: !/[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password !== confirmarSenha,
    };
    setSenhaErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  useEffect(() => {
    const googleData = localStorage.getItem("googleUserData");
    if (googleData) {
      const userData = JSON.parse(googleData);
      setNome(userData.name || "");
      setEmail(userData.email || "");
    } else {
      onPageChange("login");
    }
  }, [onPageChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await alunoService.cadastrar(nome, email, senha, curso);
      localStorage.setItem("userData", JSON.stringify(response));
      onPageChange("content");
>>>>>>> Stashed changes
    } catch (err) {
      setError(err.message);
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

<<<<<<< Updated upstream
        <p className="Legenda">Senha:</p>
        <input 
          name="senha" 
          type="password" 
=======
        <p className="Legenda">Escolha seu curso:</p>
        <select
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          required
        >
          <option value="">Selecione um curso</option>
          <option value="SI">Sistemas de Informação</option>
          <option value="CC">Ciência da Computação</option>
          <option value="EC">Engenharia da Computação</option>
        </select>

        <p className="Legenda">Crie sua senha:</p>
        <input
          name="senha"
          type="password"
>>>>>>> Stashed changes
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
<<<<<<< Updated upstream
        
        <button 
          className="button" 
          type="submit" 
          disabled={loading}
        >
=======

        <div className="senha-requisitos">
          <p className={senhaErrors.length ? "invalido" : "valido"}>
            ✓ Mínimo de 8 caracteres
          </p>
          <p className={senhaErrors.uppercase ? "invalido" : "valido"}>
            ✓ Pelo menos uma letra maiúscula
          </p>
          <p className={senhaErrors.lowercase ? "invalido" : "valido"}>
            ✓ Pelo menos uma letra minúscula
          </p>
          <p className={senhaErrors.number ? "invalido" : "valido"}>
            ✓ Pelo menos um número
          </p>
          <p className={senhaErrors.special ? "invalido" : "valido"}>
            ✓ Pelo menos um caractere especial
          </p>
        </div>

        <p className="Legenda">Confirme sua senha:</p>
        <input
          name="confirmarSenha"
          type="password"
          value={confirmarSenha}
          onChange={(e) => {
            setConfirmarSenha(e.target.value);
            validatePassword(senha);
          }}
          placeholder="Confirme sua senha"
        />
        {senhaErrors.match && confirmarSenha && (
          <p className="senha-error">As senhas não coincidem</p>
        )}

        <button type="submit" disabled={loading}>
>>>>>>> Stashed changes
          {loading ? "Enviando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
