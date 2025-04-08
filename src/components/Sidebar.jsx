// componente responsavel por renderizar a barra lateral
import '@styles/Sidebar.css';
import { motion } from 'framer-motion';


const Sidebar = ({ conteudos, provas}) => {
    return (
        <motion.div
            className="sidebar"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3>Conteúdos</h3>
            <ul className="sidebar-lista">
                {conteudos.map((conteudo, index) => (
                    <li key={index}
                    >
                        <button
                            className="sidebar-button"
                            
                        >
                            {conteudo.nome}
                        </button>
                    </li>
                ))}
            </ul>
            <h3>Provas e Listas</h3>
            <ul>
                {provas.map((prova, index) => (
                    <li key={index}>
                        <button
                            className="sidebar-button"
                        >
                            {prova.periodo}
                        </button>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Sidebar;