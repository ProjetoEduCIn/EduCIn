<<<<<<< Updated upstream
import React, { useState } from 'react';
=======
import  { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    return (
        <div className="ContainerImagem">
            <form className="containerLogin" onSubmit={handleSubmit}>
                <p id="Login">Login</p>
                {error && <div className="error-message">{error}</div>}
                <p className="Legenda email">Email:</p>
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
                    type="submit" 
                    className="FazerLogin" 
                    disabled={loading}
                >
                    {loading ? "Carregando..." : "Fazer Login"}
                </button>
                <div className="botoes-container">
                    <button 
                        className="EsqueceuSenha" 
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange('esqueceusenha');
                        }}
                    >
                        Esqueceu sua senha?
                    </button>
                    <button 
                        className="Registrar" 
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange('profile');
                        }}
                    >
                        Não tem conta? <strong>Registre-se!</strong>
                    </button>
                </div>
            </form>
        </div>
    );
=======
    try {
      const response = await alunoService.login(email, senha);

      if (response.success) {
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userData", JSON.stringify(response.user));
        onPageChange("content");
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  // Login com Google
  const handleGoogleLoginSuccess = async (response) => {
    setLoading(true);
    setError("");

    try {
      const token = response.credential; // Captura o token do Google
    console.log("Token recebido do Google:", token); // Log para depuração

    // Decodifica o token para obter o email do usuário
    const userObject = jwtDecode(token);
    const userEmail = userObject.email;

    console.log("Email do usuário:", userEmail); // Log para depuração

    // Verifica se o email é do domínio @cin.ufpe.br
    if (!userEmail.endsWith("@cin.ufpe.br")) {
      setError("Apenas emails @cin.ufpe.br são permitidos");
      return;
    }

    // Tenta fazer login/registro com Google
    const loginResponse = await alunoService.googleLogin(token);

      if (loginResponse.status === "first_access") {
        // Primeiro acesso: salva dados temporários e redireciona para perfil
        localStorage.setItem(
          "googleUserData",
          JSON.stringify({
            email: userEmail,
            name: userObject.name,
            picture: userObject.picture,
            token: response.credential,
          })
        );
        onPageChange("profile");
      } else {
        // Usuário existente: salva tokens e redireciona
        localStorage.setItem("userToken", loginResponse.access_token);
        localStorage.setItem("userData", JSON.stringify(loginResponse.user));
        onPageChange("content");
      }
    } catch (error) {
      console.error("Erro no login com Google:", error);
      setError("Falha no login com Google. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Falha no login com Google:", error);
    setError("Falha no login com Google. Por favor, tente novamente.");
  };

  return (
    <GoogleOAuthProvider clientId="692737049916-miegon1ifskij17dpt54ufq13qfulto7.apps.googleusercontent.com">
      <div className="ContainerImagem">
        <form onSubmit={handleSubmit}>
          <p id="Login">Login</p>
          {error && <div className="error-message">{error}</div>}
          <p className="Legenda">Email:</p>
          <input
            type="email"
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@cin.ufpe.br"
            required
          />
          <p className="Legenda">Senha:</p>
          <input
            type="password"
            id="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
            required
          />

          <button type="submit" className="FazerLogin" disabled={loading}>
            {loading ? "Carregando..." : "Fazer Login"}
          </button>

          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />

          <div className="ContainerBotoesLogin">
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
        </form>
      </div>
    </GoogleOAuthProvider>
  );
>>>>>>> Stashed changes
};

export default Login;