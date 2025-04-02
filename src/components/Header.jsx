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
                    <ul>
                        <li><Link to="/si" className='link'>Sistemas de Informação</Link></li>
                        <li><Link to="/cc" className='link'>Ciência da Computação</Link></li>
                        <li><Link to="/ec" className='link'>Engenharia da Computação</Link></li>
                        
                    </ul>
                </nav>
            )}
        </motion.header>
    );
};

export default Header;