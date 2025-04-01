import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {disciplina} from '@components/DadosMockados'; // Importando os dados da disciplina
import Sidebar from './Sidebar'; // Ajuste o caminho se necessário
const HomeContent = () => {
    

    return (
        <div>
            <Sidebar /> {/* Adicionando a barra lateral */}
            <h1>{disciplina.nome}</h1>
            <p>{disciplina.descricao}</p>

        </div>
    );
};

export default HomeContent;
