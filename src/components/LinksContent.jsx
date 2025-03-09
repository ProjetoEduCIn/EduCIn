import React from 'react';

const LinksContent = ({ conteudo }) => {
    return (
        <div>
            {conteudo.map((item, index) => (
                item.tipo === 'link' && (
                    <div key={index}>
                        <h3>Link</h3>
                        <a href={item.link}>{item.descricao}</a>
                    </div>
                )
            ))}
        </div>
    );
};

export default LinksContent;