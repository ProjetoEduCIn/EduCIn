import React, { useState } from 'react';
import "@styles/PaginaDeLogin.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Tentativa de login com:', { email, senha });
        // Aqui você pode adicionar sua lógica de autenticação
    };

    return (
        <div className="ContainerImagem">
            <form className="containerLogin" onSubmit={handleSubmit}>
                <p id="Login">Login</p>
                <p className="Legenda email">Email</p>
                <input 
                    type="email" 
                    id="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <p className="Legenda">Senha</p>
                <input 
                    type="password" 
                    id="Senha" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button type="submit" className="FazerLogin">
                    Fazer Login
                </button>
                <button type="button" className="EsqueceuSenha">
                    Esqueceu sua senha?
                </button>
            </form>
        </div>
    );
};

export default Login;