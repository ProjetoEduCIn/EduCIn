import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { alunoService } from "../../services/apiService";
import "@styles/PaginaDeLogin.css";

const Login = ({ onPageChange }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            // Login simplificado para desenvolvimento/demonstração
            if ((email === '' && senha === '') || 
                (email === 'admin@cin.ufpe.br' && senha === 'admin')) {
                console.log('Login de desenvolvimento bem sucedido!');
                
                // Salva dados mockados
                localStorage.setItem('userToken', 'dev-token-123');
                localStorage.setItem('userData', JSON.stringify({
                    id: '1',
                    nome: 'Usuário de Desenvolvimento',
                    email: email || 'admin@cin.ufpe.br',
                    curso: 'SI'
                }));
                
                onPageChange('content');
                return;
            }
            
            // Verificação básica de formato de email
            if (!email.endsWith('@cin.ufpe.br')) {
                throw new Error('Apenas emails @cin.ufpe.br são permitidos.');
            }
            
            try {
                // Tenta fazer login usando o serviço da API
                const response = await alunoService.login(email, senha);
                console.log('Login bem sucedido via API!', response);
                
                // Armazena o token e dados do usuário
                localStorage.setItem('userToken', response.token);
                localStorage.setItem('userData', JSON.stringify(response.user));
                
                onPageChange('content');
            } catch (apiError) {
                console.error('Erro na API de login:', apiError);
                
                // Fallback para modo desenvolvimento se a API falhar
                console.log('Usando fallback de login (modo desenvolvimento)');
                
                // Dados mockados
                const userData = {
                    id: '1',
                    nome: 'Aluno CIn',
                    email: email,
                    curso: email.includes('ec') ? 'EC' : email.includes('cc') ? 'CC' : 'SI'
                };
                
                // Armazena o token ou informações do usuário
                localStorage.setItem('userToken', 'token-' + Date.now());
                localStorage.setItem('userData', JSON.stringify(userData));
                
                onPageChange('content');
            }
            
        } catch (error) {
            console.error('Falha no login:', error);
            setError(error.message || 'Email ou senha inválidos. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginSuccess = (response) => {
        console.log('Login com Google bem sucedido!', response);
        const userObject = jwtDecode(response.credential); // Alterado aqui
        const userEmail = userObject.email;

        console.log('Email do usuário:', userEmail); // Log de depuração

        if (!userEmail.endsWith('@cin.ufpe.br')) {
            setError('Apenas emails @cin.ufpe.br são permitidos.');
            return;
        }

        // Armazena o token e dados do usuário
        localStorage.setItem('userToken', response.credential);
        localStorage.setItem('userData', JSON.stringify(userObject));
        console.log('Redirecionando para a página de conteúdo'); // Log de depuração
        onPageChange('content');
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Falha no login com Google:', error);
        setError('Falha no login com Google. Por favor, tente novamente.');
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
                        disabled={loading}>
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
                                onPageChange('esqueceusenha');
                            }}>
                            Esqueceu sua senha?
                        </button>
                        
                        <button 
                            className="Registrar" 
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange('profile');
                            }}>
                            Não tem conta? <strong>Registre-se!</strong>
                        </button>
                    </div>
                </form>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;