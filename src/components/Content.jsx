import React from 'react';
import '@styles/index.css';
import '@styles/PaginaInicial.css';
import '@styles/reset.css';



const Content = () => {
    return (
        <div>
            <h3 className="periodo">1° Período</h3>
            <div className="cadeiras">
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Introdução à Programação</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Sistemas Digitais</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Concepção de Artefatos Digitais</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Matemática Discreta</p>
                    </div>
                </a>
            </div>

            <h3 className="periodo">2° Período</h3>
            <div className="cadeiras">
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Estrutura De Dados Orientada a Objetos</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Desenvolvimento de Software</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Arquitetura de Computadores e Sistemas Operacionais</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Cálculo 1</p>
                    </div>
                </a>
            </div>

            <h3 className="periodo">3° Período</h3>
            <div className="cadeiras">
                {/* Repete a estrutura para o 3º período */}
            </div>

            <h3 className="periodo">4° Período</h3>
            <div className="cadeiras">
                {/* Repete a estrutura para o 4º período */}
            </div>
        </div>
    );
};

export default Content;