import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Corrigido: forma correta de importar
import { alunoService } from "../../services/apiService";
import "@styles/PaginaDeLogin.css";

const Login = ({ onPageChange }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login com email/senha
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await alunoService.login(email, senha);
      // Armazena tokens e dados do usuário no localStorage
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("userData", JSON.stringify(response.user));
      onPageChange("content");
    } catch (error) {
      console.error("Erro no login:", error);
      setError(error.response?.data?.detail || "Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  // Login com Google
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");

    try {
      const token = credentialResponse.credential;
      console.log("Token do Google recebido");

      // Decodifica o token para obter informações do usuário
      const userObject = jwtDecode(token);
      const userEmail = userObject.email;

      // Verifica se o email é do domínio @cin.ufpe.br
      if (!userEmail.endsWith("@cin.ufpe.br")) {
        setError("Apenas emails @cin.ufpe.br são permitidos");
        setLoading(false);
        return;
      }

      // Comunica com o backend para login/registro via Google
      const loginResponse = await alunoService.googleLogin(token);

      if (loginResponse.status === "first_access") {
        // Primeiro acesso: salva dados temporários e redireciona para completar perfil
        localStorage.setItem(
          "googleUserData",
          JSON.stringify({
            email: userEmail,
            name: userObject.name || userObject.given_name,
            picture: userObject.picture,
            token: token,
          })
        );
        onPageChange("profile");
      } else {
        // Usuário existente: salva tokens e redireciona para conteúdo
        localStorage.setItem("access_token", loginResponse.access_token);
        localStorage.setItem("refresh_token", loginResponse.refresh_token);
        localStorage.setItem("userData", JSON.stringify(loginResponse.user));
        onPageChange("content");
      }
    } catch (error) {
      console.error("Erro no login com Google:", error);
      setError("Falha no login com Google. Verifique se seu email é do CIn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="692737049916-miegon1ifskij17dpt54ufq13qfulto7.apps.googleusercontent.com">
      <div className="ContainerImagem">
        <div className="containerLogin">
          <p id="Login">Login</p>
          {error && (
            <div
              className="error-message"
              style={{ color: "white", margin: "10px" }}
            >
              {error}
            </div>
          )}

          <p className="Legenda">Email:</p>
          <input
            type="email"
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@cin.ufpe.br"
          />

          <p className="Legenda">Senha:</p>
          <input
            type="password"
            id="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
          />

          <button
            className="FazerLogin"
            onClick={handleSubmit}
            disabled={loading} >
            {loading ? "Carregando..." : "Fazer Login"}
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }} >
            
            <div className="botoes-container">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => setError("Erro ao conectar com Google")}
                size="large"
                text="continue_with"
                shape="pill"
                locale="pt-BR" />

              <button
                className="EsqueceuSenha"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange("esqueceusenha");
                }}
                >
                Esqueceu sua senha?
              </button>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
