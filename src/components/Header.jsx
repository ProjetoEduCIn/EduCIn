import '@styles/Header.css';
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom

const Header = ({ currentPage }) => {
    return (
        <header className="flex header">
            <img 
                style={{ height: '100%', marginLeft: '0.5%' }}
                src="/imagens/ImagemHeader.png" 
                alt="Logo" 
            />
            {currentPage === 'content' && (
                <nav>
                    <Link to = "/si">Sistemas de Informação</Link>
                    <Link to = "/cc">Ciência da Computação</Link>
                    <Link to = "/ec">Engenharia da Computação</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;