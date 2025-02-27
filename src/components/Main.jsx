import React, { useState } from 'react';
import Header from './Header';
import Content from './Content';
import Login from './Login';

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
        </div>
    );
}

export default Main;