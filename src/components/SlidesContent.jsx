import React from 'react';

const SlidesContent = ({ conteudo }) => {
    return (
        <>
            {conteudo.map((item, index) => (
                item.tipo === 'slide' && (
                    <div key={index}>
                        <h3>Slide</h3>
                        <iframe src={item.link}></iframe>
                    </div>
                )
            ))}
        </>
    );
};

export default SlidesContent;