import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeContent = () => {
    // Definição do estado local para armazenar a disciplina
    const [disciplina] = useState({
        nome: "Sistemas Digitais",
        descricao: "Bem-vindo à disciplina de Sistemas Digitais!",
        video: [
            {
                modulo: "Portas Lógicas",
                videos: [
                    {
                        titulo: "Introdução às Portas Lógicas",
                        link: "https://youtu.be/video1",
                        descricao: "Uma introdução ao conceito de portas lógicas."
                    },
                    {
                        titulo: "Portas AND, OR e NOT",
                        link: "https://youtu.be/video2",
                        descricao: "Explicação sobre as portas AND, OR e NOT."
                    },
                    {
                        titulo: "Portas XOR e XNOR",
                        link: "https://youtu.be/video3",
                        descricao: "Diferenças entre portas XOR e XNOR."
                    }
                ]
            }
        ]
    });

    return (
        <div>
            <h1>{disciplina.nome}</h1>
            <p>{disciplina.descricao}</p>

            <h2>Módulos disponíveis:</h2>
            <ul>
                {disciplina.video.map((modulo, index) => (
                    <li key={index}>
                        <h3>{modulo.modulo}</h3>
                        <ul>
                            {modulo.videos.map((video, idx) => (
                                <li key={idx}>
                                    <Link to={`video/${idx}`}>{video.titulo}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomeContent;
