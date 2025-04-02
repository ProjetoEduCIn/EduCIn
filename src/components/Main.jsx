import { useState } from 'react';
import Header from './Header';
import Content from './pages/Content';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EsqueceuSenha from './pages/EsqueceuSenha';

function Main() {
    const [currentPage, setCurrentPage] = useState('login');

    return (
        <div style={{ paddingTop: '10dvh' }}>
            <Header currentPage={currentPage} />
            {currentPage === 'login' && (
                <Login onPageChange={setCurrentPage} />
            )}
            {currentPage === 'content' && (
                <Content />
            )}
            {currentPage === 'profile' && (
                <Profile onPageChange={setCurrentPage} /> 
            )}
        
            {currentPage === 'esqueceusenha' && (
                <EsqueceuSenha onPageChange={setCurrentPage} />
            )}
        </div>
    );
}

export default Main;
