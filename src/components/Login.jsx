import React, { useState } from 'react';
import "@styles/PaginaDeLogin.css";

const Login = ({ onPageChange }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Verifica se os campos estão vazios ou se são admin/admin
        if ((email === '' && senha === '') || 
            (email === 'admin@cin.ufpe.br' && senha === 'admin')) {
            console.log('Login bem sucedido!');
            onPageChange('content'); // Muda para a página de conteúdo
        } else {
            alert('Credenciais inválidas!');
        }
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