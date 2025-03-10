import '@styles/index.css';
import '@styles/PaginaInicial.css';
import '@styles/reset.css';
import { motion } from 'framer-motion'; //biblioteca de animação



const Content = () => {
    return (
        <motion.div 
        initial={{ opacity: 0, x: 20}} 
        animate={{ opacity: 1, x: 0 }} 
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3}}
        >
            <h3 className="periodo">1° Período</h3>
            <div className="cadeiras">
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Introdução à Programaçãoo</p>
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
                <a className="Card" href="#">
                        <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                        <div className="Inferior">
                            <p>Álgebra Vetorial</p>
                        </div>
                    </a>
                    <a className="Card" href="#">
                        <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                        <div className="Inferior">
                            <p>Algoritmos</p>
                        </div>
                    </a>
                    <a className="Card" href="#">
                        <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                        <div className="Inferior">
                            <p>Banco de Dados</p>
                        </div>
                    </a>
                    <a className="Card" href="#">
                        <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                        <div className="Inferior">
                            <p>Integ e Evol de SI</p>
                        </div>
                    </a>            
            </div>

            <h3 className="periodo">4° Período</h3>
            <div className="cadeiras">
                {/* Repete a estrutura para o 4º período */}
            </div>
        </motion.div>
    );
};

export default Content;