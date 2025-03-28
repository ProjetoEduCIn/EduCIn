import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { disciplinaService } from '../../services/apiService';
import '@styles/index.css';
import '@styles/PaginaInicial.css';
import '@styles/reset.css';
import { motion } from 'framer-motion';

const Content = () => {
    const [disciplinas, setDisciplinas] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                // Busca todas as disciplinas sem verificar o curso do usuário
                const response = await disciplinaService.getDisciplinas();
                setDisciplinas(response);
            } catch (err) {
                console.error("Erro ao buscar disciplinas:", err);
                setDisciplinas(getAllFallbackDisciplinas());
            } finally {
                setLoading(false);
            }
        };

        fetchDisciplinas();
    }, []);

    // Função para obter os dados fallback caso a API falhe
    const getFallbackDisciplinas = (periodo) => {
        // Usando os dados atuais do componente como fallback
        const fallbackData = {
            1: [
                { id: 'sd', nome: 'Sistemas Digitais', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'ip', nome: 'Introdução a Programação', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'cad', nome: 'Concepção de Artefatos Digitais', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'md', nome: 'Matemática Discreta', imagem: '/imagens/ImagemLivro.jpg' }
            ],
            2: [
                { id: 'edoo', nome: 'Estrutura De Dados Orientada a Objetos', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'ds', nome: 'Desenvolvimento de Software', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'acso', nome: 'Arquitetura de Computadores e Sistemas Operacionais', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'calc1', nome: 'Cálculo 1', imagem: '/imagens/ImagemLivro.jpg' }
            ],
            // Adicione os outros períodos com os dados atuais do componente...
            3: [
                { id: 'av', nome: 'Álgebra Vetorial', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'alg', nome: 'Algoritmos', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'bd', nome: 'Banco de Dados', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'iesi', nome: 'Integ e Evol de SI', imagem: '/imagens/ImagemLivro.jpg' }
            ],
            // Você pode adicionar os outros períodos da mesma forma
            4: [
                { id: 'epc', nome: 'Estatística e Probabilidade Para Computação', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'lc', nome: 'Lógica para Computação', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'isdr', nome: 'Introdução a Sistemas Distribuidos e Redes de Computadores', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'amcd', nome: 'Aprendizado de Máquina e Ciência de Dados', imagem: '/imagens/ImagemLivro.jpg' }
            ],
            5: [
                { id: 'ei', nome: 'Empreendimentos em Informática', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'asesi', nome: 'Aspectos Sócio-Econômicos de Sistemas de Informação', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'ac', nome: 'Administração Contemporânea', imagem: '/imagens/ImagemLivro.jpg' }
            ],
            6: [
                { id: 'ae', nome: 'Arquitetura Empresarial', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'gpn', nome: 'Gestão de Processos de Negócios', imagem: '/imagens/ImagemLivro.jpg' }
            ],
            7: [
                { id: 'ctc', nome: 'Comuniação Técnica e Cientifica', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'apsi', nome: 'Análise e Projeto de Sistemas de Informação', imagem: '/imagens/ImagemLivro.jpg' }
            ],
            8: [
                { id: 'tcc', nome: 'TCC', imagem: '/imagens/ImagemLivro.jpg' }
            ],
            'eletivas': [
                { id: 'eletx', nome: 'eletiva x', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'elety', nome: 'eletiva y', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'eletz', nome: 'eletiva z', imagem: '/imagens/ImagemLivro.jpg' },
                { id: 'eletl', nome: 'eletiva livre', imagem: '/imagens/ImagemLivro.jpg' }
            ]
        };
        
        return fallbackData[periodo] || [];
    };

    const getAllFallbackDisciplinas = () => {
        const periodos = [1, 2, 3, 4, 5, 6, 7, 8, 'eletivas'];
        const result = {};
        periodos.forEach(periodo => {
            result[periodo] = getFallbackDisciplinas(periodo);
        });
        return result;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <p>Carregando disciplinas...</p>
            </div>
        );
    }

    return (
        <motion.div className='ContainerCadeiras'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}>
            {/* Refatorar o codigo e fazer uma função que renderiza todos os conteúdos e outra que faz o container inteiro */}
            {error && <div className="error-message">{error}</div>}
           

            <div className='CardCadeiras'>
                <h3 className="periodo">1° Período</h3>
                <div className="cadeiras">
                    {disciplinas[1]?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}
                        >
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='CardCadeiras'>
                <h3 className="periodo">2° Período</h3>
                <div className="cadeiras">
                    {disciplinas[2]?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}
                        >
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='CardCadeiras'>
                <h3 className="periodo">3° Período</h3>
                <div className="cadeiras">
                    {disciplinas[3]?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}
                        >
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='CardCadeiras'>
                <h3 className="periodo">4° Período</h3>
                <div className="cadeiras">
                    {disciplinas[4]?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}
                        >
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className='CardCadeiras'>
                <h3 className="periodo">5° Período</h3>
                <div className="cadeiras">
                    {disciplinas[5]?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}
                        >
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className='CardCadeiras'>
                <h3 className="periodo">6° Período</h3>
                <div className="cadeiras">
                    {disciplinas[6]?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}
                        >
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className='CardCadeiras'>
                <h3 className="periodo">7° Período</h3>
                <div className="cadeiras">
                    {disciplinas[7]?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}
                        >
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className='CardCadeiras'>
                <h3 className="periodo">8° Período</h3>
                <div className="cadeiras">
                    {disciplinas[8]?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}
                        >
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className='CardCadeiras'>
                <h3 className='periodo'>Eletivas</h3>
                <div className='cadeiras'>
                    {disciplinas['eletivas']?.map((disciplina) => (
                        <Link 
                            key={disciplina.id} 
                            className="Card" 
                            to={`/disciplina/${disciplina.id}`}>
                            <img src={disciplina.imagem || '/imagens/ImagemLivro.jpg'} alt="Livro" />
                            <div className="Inferior">
                                <p>{disciplina.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>


            
            
            
            

            

            
        </motion.div>
    );
};

export default Content;