
//biblioteca de rotas
import{ BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
//importando os componentes
import Header from './components/Header';
import Main from './components/Main';
import '@styles/index.css';
import Content from './components/Content';
import ContentCC from './components/ContentCC';
import ContentEC from './components/ContentEC';

//biblioteca de animação
import { AnimatePresence } from 'framer-motion';


function AnimatedRoutes(){

  const location = useLocation();

  return(
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Main />} />
          <Route path="/si" element={<Content />} />
          <Route path="/cc" element={<ContentCC />} />
          <Route path="/ec" element={<ContentEC />} />
        </Routes>
      </AnimatePresence>
  )
}

function App() {

  return (
    <BrowserRouter>
       <div>
        <Header currentPage="content" />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;