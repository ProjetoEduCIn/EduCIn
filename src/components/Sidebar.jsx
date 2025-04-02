import { useState } from 'react';
import { Link } from 'react-router-dom';
import '@styles/Sidebar.css';
import { disciplina } from '@components/DadosMockados'; // Importando os dados mockados

const Sidebar = () => {
  const [moduloAberto, setModuloAberto] = useState(null);

  const toggleModulo = (index) => {
    setModuloAberto(moduloAberto === index ? null : index); // Alterna entre abrir e fechar
  };

  return (
    <nav className="sidebar">
      {disciplina.video.map((modulo, index) => (
        <div key={index}>
          {/* Módulo clicável */}
          <div 
            className="sidebar-link" 
            onClick={() => toggleModulo(index)}
            style={{ cursor: 'pointer' }} // Para indicar que é clicável
          >
            <ul>
            {modulo.modulo}</ul>
          </div>

          {/* Exibe os vídeos quando o módulo está aberto */}
          {moduloAberto === index && (
            <div className="video-list">
              {modulo.videos.map((video, i) => (
                <li key={i} className="video-item">
                  <Link to={video.link} target="_blank">
                    {video.titulo}
                  </Link>
                </li>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
