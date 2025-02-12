import { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer({ song, isPlaying, onPlay }) {
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState("auto");

  const getYouTubeId = (url) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(song.src);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

  useEffect(() => {
    if (isPlaying && thumbnailRef.current) {
      setIframeHeight(thumbnailRef.current.clientHeight + "px");
    }
  }, [isPlaying]);

  return (
    <div className="music-card">
      {isPlaying ? (
        <>
          {isLoading && <div className="skeleton" style={{ height: iframeHeight }}></div>}
          <iframe
            ref={iframeRef}
            className="music-video"
            width="100%"
            height={iframeHeight}
            src={`${song.src}&autoplay=1`}
            title={song.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
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
            setIsLoading(true);
            onPlay();
          }}
          ref={thumbnailRef}
        >
          <img src={thumbnailUrl} alt={song.title} className="thumbnail-image" />
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
