import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header          from './components/Header';
import Main            from './components/Main';
import VideoContent    from './components/VideoContent';
import SlidesContent   from './components/SlidesContent';
import LinksContent    from './components/LinksContent';
import HomeContent     from './components/HomeContent';
import Content         from './components/pages/Content';
import ContentCC       from './components/pages/ContentCC';
import ContentEC       from './components/pages/ContentEC';
import DisciplinaPage  from './components/pages/DisciplinaPage';
import QuestoesContent from './components/pages/QuestoesContent';
import '@styles/index.css';
import { AnimatePresence } from 'framer-motion';

const disciplinas = [
    {
        nome: 'Sistemas Digitais',
        conteudo: [
            { tipo: 'video', link: 'video-link.mp4' },
            { tipo: 'questao', descricao: 'Questão 1' },
            { tipo: 'slide', link: 'slide-link.pdf' },
            { tipo: 'link', descricao: 'Link 1', link: 'http://example.com' },
            { tipo: 'prova', nome: 'Prova I - 2024.2', visualizarLink: '#', baixarLink: '#' },
        ],
    },
    // Adicione mais disciplinas conforme necessário
];

const disciplinasTeste = {
    "rota": "sistemas-digitais",
    "nome": "Sistemas Digitais",
    videos: [
        {
            "modulo": "Portas Lógicas",
            "conteudo": [
                {
                    "titulo": "Introdução às Portas Lógicas",
                    "link": "https://youtu.be/video1",
                    "descricao": "Introdução ao conceito de portas lógicas e sua importância nos circuitos digitais."
                },
                {
                    "titulo": "Portas AND, OR e NOT",
                    "link": "https://youtu.be/video2",
                    "descricao": "Explicação detalhada sobre as portas AND, OR e NOT com exemplos práticos."
                },
                {
                    "titulo": "Portas XOR e XNOR",
                    "link": "https://youtu.be/video3",
                    "descricao": "Funcionamento das portas XOR e XNOR e suas aplicações em circuitos digitais."
                }
            ]
        },
        {
            "modulo": "Modulo 2",
            "conteudo": [
                {
                    "titulo": "Introdução às Portas Lógicas",
                    "link": "https://youtu.be/video1",
                    "descricao": "Introdução ao conceito de portas lógicas e sua importância nos circuitos digitais."
                },
                {
                    "titulo": "Portas AND, OR e NOT",
                    "link": "https://youtu.be/video2",
                    "descricao": "Explicação detalhada sobre as portas AND, OR e NOT com exemplos práticos."
                },
                {
                    "titulo": "Portas XOR e XNOR",
                    "link": "https://youtu.be/video3",
                    "descricao": "Funcionamento das portas XOR e XNOR e suas aplicações em circuitos digitais."
                }
            ]
        }
    ]
}


function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Main />} />
                <Route path="/si" element={<Content />} />
                <Route path="/cc" element={<ContentCC />} />
                <Route path="/ec" element={<ContentEC />} />
                {disciplinas.map((disciplina, index) => (
                    // Cria as rotas automaticamente
                <Route
                    key={index}
                    path={`/${disciplina.nome.replace(/\s+/g, '-').toLowerCase()}`}
                    element={<DisciplinaPage nomeDisciplina={disciplina.nome} conteudo={disciplina.conteudo} />}>

                        {/* Cria as sub-rotas para cada rota */}
                        <Route path="home"     element={<HomeContent />} />
                        {/* <Route path=""         element={<HomeContent     conteudo={disciplina.conteudo} />} /> */}
                        <Route path="video"    element={<VideoContent    conteudo={disciplina.conteudo} />} />
                        <Route path="questoes" element={<QuestoesContent conteudo={disciplina.conteudo} />} />
                        <Route path="slides"   element={<SlidesContent   conteudo={disciplina.conteudo} />} />
                        <Route path="links"    element={<LinksContent    conteudo={disciplina.conteudo} />} />
                </Route>
                ))}
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter>
            <>
                <Header currentPage="content" />
                <AnimatedRoutes />
            </>
        </BrowserRouter>
    );
}

export default App;