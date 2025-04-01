import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import HomeContent from '../HomeContent';
const DisciplinaPage = ({ nomeDisciplina, conteudo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirecionamento automático
  useEffect(() => {
    if (location.pathname === `/disciplina/${nomeDisciplina.toLowerCase().replace(/\s+/g, '-')}`) {
      navigate('home');
    }
  }, [location.pathname, navigate, nomeDisciplina]);

  return (
    <div className="disciplina-page">
        
      <Outlet context={{ conteudo }} /> {/* Passa o conteúdo para subcomponentes */}
    </div>
  );
};

export default DisciplinaPage;