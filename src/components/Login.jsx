import React from 'react';
import './PaginaDeLogin.css'; // Importando o CSS específico para a página de login

const Login = () => {
    return (
        <div className="ContainerImagem">
            <div className="containerLogin">
                <p id="Login">Login</p>
                <p className="Legenda email">Email</p>
                <input type="text" id="Email" />
                <p className="Legenda">Senha</p>
                <input type="password" id="Senha" />
                <button className="FazerLogin">Fazer Login</button>
                <button className="EsqueceuSenha">Esqueceu sua senha?</button>
            </div>
        </div>
    );
};

export default Login;