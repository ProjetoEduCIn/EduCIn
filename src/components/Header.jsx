import React from 'react';
import '@styles/Header.css';

const Header = () => {
    return (
        <header className="flex header">
            <img style={{ height: '100%', marginLeft: '0.5%' }} src="/imagens/ImagemHeader.png" alt="Logo" />
            <nav>
                <a href="#">Sistemas de Informação</a>
                <a href="#">Ciência da Computação</a>
                <a href="#">Engenharia da Computação</a>
            </nav>
        </header>
    );
};

export default Header;