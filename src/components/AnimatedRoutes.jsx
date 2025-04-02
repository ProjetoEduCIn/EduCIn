import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Main from './Main';
import Content from '@components/pages/Content';
import ContentCC from '@components/pages/ContentCC';
import ContentEC from '@components/pages/ContentEC';
import DisciplinaPage from '@components/pages/DisciplinaPage';
import VideoContent from '@components/VideoContent';
import SlidesContent from '@components/SlidesContent';
import QuestoesContent from '@components/pages/QuestoesContent';
import HomeContent from './HomeContent';

// Dados mockados
const disciplinas = [
  {
    id: 'sd', // ID único para usar na URL
    nome: 'Sistemas Digitais',
    conteudo: [
      { tipo: 'video', link: 'https://youtu.be/vJndUdzCHzM?si=WLa0K8Yfq8uspOl1' },
      { tipo: 'questao', descricao: 'Questão 1' },
      { tipo: 'slide', link: 'slide-link.pdf' },
      { tipo: 'link', descricao: 'Link 1', link: 'http://example.com' },
    ],
  },
  // Adicione mais disciplinas...
];

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rotas principais */}
        <Route path="/" element={<Main />} />
        <Route path="/si" element={<Content />} />
        <Route path="/cc" element={<ContentCC />} />
        <Route path="/ec" element={<ContentEC />} />

        {/* Rotas dinâmicas para disciplinas */}
        {disciplinas.map((disciplina) => (
          <Route
            key={disciplina.id}
            path={`/disciplina/${disciplina.id}`}
            element={
              <DisciplinaPage 
                nomeDisciplina={disciplina.nome} 
                conteudo={disciplina.conteudo} 
              />
            }
          >
            <Route index element={<HomeContent />} />
            <Route path="video" element={<VideoContent />} />
            <Route path="slides" element={<SlidesContent />} />
            <Route path="questoes" element={<QuestoesContent />} />
          </Route>
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;