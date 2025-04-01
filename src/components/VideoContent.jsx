import React from 'react';
import { useOutletContext } from 'react-router-dom';

const VideoContent = () => {
  const { conteudo } = useOutletContext();
  const videos = conteudo.filter(item => item.tipo === 'video');

  return (
    <div className="video-container">
      {videos.map((video, index) => (
        <div key={index}>
          <video controls src={video.link} />
          <p>{video.descricao}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoContent;