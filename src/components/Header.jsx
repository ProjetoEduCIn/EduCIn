import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@styles/Header.css';

const Header = ({ currentPage }) => {
    return (
        <motion.header
            className="flex header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
        >
            <img 
                style={{ height: '100%', marginLeft: '0.5%' }}
                src="/imagens/ImagemHeader.png" 
                alt="Logo" 
            />
            {currentPage === 'content' && (
                <nav>
                    <Link to="/si">Sistemas de Informação</Link>
                    <Link to="/cc">Ciência da Computação</Link>
                    <Link to="/ec">Engenharia da Computação</Link>
                </nav>
            )}
        </motion.header>
    );
};

export default Header;