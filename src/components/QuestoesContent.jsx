import React from 'react';

const QuestoesContent = ({ conteudo }) => {
    return (
        <>
            {conteudo.map((item, index) => (
                item.tipo === 'questao' && (
                    <div key={index}>
                        <h3>Questão</h3>
                        <p>{item.descricao}</p>
                    </div>
                )
            ))}
        </>
    );
};

export default QuestoesContent;