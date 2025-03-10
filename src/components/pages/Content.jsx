import '@styles/index.css';
import { Link } from 'react-router-dom';
import '@styles/PaginaInicial.css';
import '@styles/reset.css';
import { motion } from 'framer-motion';
import CursoPage from '../../components/CoursesPage.jsx';

//conteudos de SI

const Content = () => {
    return (
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}>
           
           <div>
           <CursoPage curso="Sistemas de Informação" />
           </div>
            {/*<h3 className="periodo">1° Período</h3>
            <div className="cadeiras">



                <Link className="Card" to="/sistemas-digitais">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Sistemas Digitais</p>
                    </div>
                </Link>



                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Introdução a Programação</p>
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
            <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Estatística e Probabilidade Para Computação</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Lógica para Computação</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Introdução a Sistemas Distribuidos e Redes de Computadores</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Aprendizado de Máquina e Ciência de Dados</p>
                    </div>
                </a>
            </div>
            


            
            <h3 className="periodo">5° Período</h3>
            <div className="cadeiras">
            <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Empreendimentos em Informática</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Aspectos Sócio-Econômicos de Sistemas de Informação</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Administração Contemporânea</p>
                    </div>
                </a>
               
            </div>



            
            <h3 className="periodo">6° Período</h3>
            <div className="cadeiras">
            <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Arquitetura Empresarial</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Gestão de Processos de Negócios</p>
                    </div>
                </a>
                
            </div>





            
            <h3 className="periodo">7° Período</h3>
            <div className="cadeiras">
            <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Comuniação Técnica e Cientifica</p>
                    </div>
                </a>
                <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>Análise e Projeto de Sistemas de Informação</p>
                    </div>
                </a>
            </div> 





            <h3 className="periodo">8° Período</h3>
            <div className="cadeiras">
            <a className="Card" href="#">
                    <img src="/imagens/ImagemLivro.jpg" alt="Livro" />
                    <div className="Inferior">
                        <p>TCC</p>
                    </div>
                </a>
            </div>




            <h3 className='periodo'> Eletivas</h3>
            <div className='cadeiras'>
                <a className='Card' href='#'>
                    <img src='/imagens/ImagemLivro.jpg' alt='Livro'/>
                    <div className='Inferior'>
                        <p>eletiva x</p>
                    </div>
                </a>
                <a className='Card' href='#'>
                    <img src='/imagens/ImagemLivro.jpg' alt='Livro'/>
                    <div className='Inferior'>
                        <p>eletiva y</p>
                    </div>
                </a>
                <a className='Card' href='#'>
                    <img src='/imagens/ImagemLivro.jpg' alt='Livro'/>
                    <div className='Inferior'>
                        <p>eletiva z</p>
                    </div>
                </a>
                <a className='Card' href='#'>
                    <img src='/imagens/ImagemLivro.jpg' alt='Livro'/>
                    <div className='Inferior'>
                        <p>eletiva livre</p>
                    </div>
                </a>
                
            </div>*/}

        </motion.div>



        
    );
};

export default Content;