
import { useOutletContext } from "react-router-dom";
import "@styles/VideoContent.css"; // Importar o CSS para estilização
const VideoContent = () => {
  const {materiaisExtras } = useOutletContext();
  const videos = materiaisExtras.filter((item) => item.tipo === "video");

  return (
    <div className="video-content">
      

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
