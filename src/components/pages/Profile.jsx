import { useState, useEffect } from "react";
import { alunoService } from "../../services/apiService";
import "@styles/Profile.css";

const Profile = ({ onPageChange }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
<<<<<<< HEAD
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [curso, setCurso] = useState("");
=======
  const [confirmarSenha, setConfirmarSenha] = useState(""); 
  const [curso, setCurso] = useState(""); 
>>>>>>> main
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [senhaErrors, setSenhaErrors] = useState({
    length: true,
    uppercase: true,
    lowercase: true,
    number: true,
    special: true,
<<<<<<< HEAD
    match: true,
=======
    match: true
>>>>>>> main
  });
  const validatePassword = (password) => {
    const errors = {
      length: password.length < 8,
      uppercase: !/[A-Z]/.test(password),
      lowercase: !/[a-z]/.test(password),
      number: !/[0-9]/.test(password),
      special: !/[!@#$%^&*(),.?":{}|<>]/.test(password),
<<<<<<< HEAD
      match: password !== confirmarSenha,
    };
    setSenhaErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  useEffect(() => {
    const googleData = localStorage.getItem("googleUserData");
=======
      match: password !== confirmarSenha
    };
    setSenhaErrors(errors);
    return !Object.values(errors).some(error => error);
  };



  useEffect(() => {
    const googleData = localStorage.getItem('googleUserData');
>>>>>>> main
    if (googleData) {
      const userData = JSON.parse(googleData);
      setNome(userData.name || "");
      setEmail(userData.email || "");
    } else {
<<<<<<< HEAD
      onPageChange("login");
=======
      onPageChange('login');
>>>>>>> main
    }
  }, [onPageChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
<<<<<<< HEAD

    // Validar a senha antes de enviar
    if (!validatePassword(senha)) {
      setError("Sua senha não atende aos requisitos de segurança");
      setLoading(false);
      return;
    }

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem");
      setLoading(false);
=======
    
    if (!nome || !email || !curso || !senha) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (!validatePassword(senha)) {
      setError("A senha não atende aos requisitos mínimos");
>>>>>>> main
      return;
    }

    try {
<<<<<<< HEAD
      // Obter o token do Google salvo no localStorage
      const googleData = JSON.parse(
        localStorage.getItem("googleUserData") || "{}"
      );

      // Usar o método completarCadastro em vez de cadastrar
      const response = await alunoService.completarCadastro({
        nome_preferido: nome,
        email_cin: email,
        curso: curso,
        senha: senha,
        senha_confirmacao: confirmarSenha,
        google_token: googleData.token || "",
      });

      // Guardar os tokens e dados do usuário retornados pela API
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("userData", JSON.stringify(response.user));

      // Limpar os dados temporários do Google
      localStorage.removeItem("googleUserData");

      // Avançar para a página de conteúdo
      onPageChange("content");
=======
      setLoading(true);
      const googleData = JSON.parse(localStorage.getItem('googleUserData'));
      
      await alunoService.cadastrar(nome, email, senha, curso);
      
      localStorage.setItem('userToken', googleData.credential);
      localStorage.setItem('userData', JSON.stringify({
        nome,
        email,
        curso
      }));
      
      // Removemos os dados temporários por último
      localStorage.removeItem('googleUserData');
      
      onPageChange('content');
>>>>>>> main
    } catch (err) {
      console.error("Erro ao completar cadastro:", err);
      setError(
        err.response?.data?.detail || "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Complete seu Perfil</h1>
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
          readOnly // Email do Google não deve ser editável
        />

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
<<<<<<< HEAD
        <input
          name="senha"
          type="password"
=======
        <input 
          name="senha" 
          type="password" 
>>>>>>> main
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            validatePassword(e.target.value);
          }}
          placeholder="Sua senha"
        />

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
<<<<<<< HEAD
        <input
          name="confirmarSenha"
          type="password"
=======
        <input 
          name="confirmarSenha" 
          type="password" 
>>>>>>> main
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

<<<<<<< HEAD
        <button type="submit" disabled={loading}>
=======
        
        <button 
          type="submit" 
          disabled={loading}
        >
>>>>>>> main
          {loading ? "Enviando..." : "Continuar"}
        </button>
      </form>
    </>
  );
};

export default Profile;
