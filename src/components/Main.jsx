import React, { useState } from 'react';
import Header from './Header';
import Content from './Content';
import Login from './Login';
import Profile from './Profile';
import Profile2 from './Profile2';

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
            {currentPage === 'profile2' && (
                <Profile2 onPageChange={setCurrentPage} /> 
            )}
        </div>
    );
}

export default Main;
