import React from "react";
import { useOutletContext } from "react-router-dom";

const VideoContent = () => {
  const { conteudo, materiaisExtras } = useOutletContext();
  const videos = materiaisExtras.filter((item) => item.tipo === "video");

  return (
    <div className="video-content">
      <div className="topicos-section">
        <h3>Tópicos da disciplina</h3>
        {conteudo.topicos && conteudo.topicos.length > 0 ? (
          <ul className="topicos-lista">
            {conteudo.topicos.map((topico, index) => (
              <li key={index}>{topico}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhum tópico disponível para esta disciplina.</p>
        )}
      </div>

      <div className="videos-section">
        <h3>Vídeos disponíveis</h3>
        {videos.length > 0 ? (
          <div className="videos-lista">
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <h4>{video.nome}</h4>
                <video
                  controls
                  src={video.link}
                  className="video-player"
                ></video>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum vídeo disponível para esta disciplina.</p>
        )}
      </div>
    </div>
  );
};

export default VideoContent;
