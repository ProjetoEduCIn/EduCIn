import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import AnimatedRoutes from './components/AnimatedRoutes'; // Movemos a lógica das rotas para um arquivo separado

function App() {
  return (
    <BrowserRouter>
      <Header currentPage="content" />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;