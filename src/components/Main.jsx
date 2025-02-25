import React, { useState } from 'react';
import Login from './Login';
import Home from './Home';
import Content from './Content';

function Main() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <main>
      {currentPage === 'login' && <Login />}
      {currentPage === 'home' && <Home />}
      {currentPage === 'content' && <Content />}
    </main>
  );
}

export default Main;