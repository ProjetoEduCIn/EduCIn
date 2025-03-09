// componente responsavel por renderizar a barra lateral
import { Link } from 'react-router-dom';
import '@styles/Sidebar.css';
import { motion } from 'framer-motion';

import '@styles/Sidebar.css';

const Sidebar = ({ conteudos, provas }) => {
    return (
        <motion.div
            className="sidebar"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3>Conteúdos</h3>
            <ul>
                {conteudos.map((conteudo, index) => (
                    <li key={index}>
                        <Link to={conteudo.link}>{conteudo.nome}</Link>
                    </li>
                ))}
            </ul>
            <h3>Provas e Listas</h3>
            <ul>
                {provas.map((prova, index) => (
                    <li key={index}>
                        <Link to={prova.link}>{prova.periodo}</Link>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Sidebar;