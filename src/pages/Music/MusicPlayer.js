import { useState } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer({ song, isPlaying, onPlay }) {
  const [isLoading, setIsLoading] = useState(false);

  const getYouTubeId = (url) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(song.src);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

  return (
    <div className="music-card">
      {isPlaying ? (
        <>
          {isLoading && <div className="skeleton"></div>} {/* Skeleton hiển thị khi đang load */}
          <iframe
            width="100%"
            height="200"
            src={`${song.src}&autoplay=1`}
            title={song.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setIsLoading(false)} // Khi video load xong, ẩn skeleton
            onError={() => setIsLoading(false)} // Trường hợp load lỗi cũng tắt skeleton
            style={{
              display: isLoading ? "none" : "block",
              borderRadius: "12px",
            }}
          ></iframe>
        </>
      ) : (
        <div
          className="thumbnail"
          onClick={() => {
            setIsLoading(true); // Đặt isLoading = true khi nhấn vào video
            onPlay();
          }}
        >
          <img src={thumbnailUrl} alt={song.title} />
          <button className="play-button">▶</button>
        </div>
      )}

      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-album">Album: {song.album}</p>
      </div>
    </div>
  );
}
