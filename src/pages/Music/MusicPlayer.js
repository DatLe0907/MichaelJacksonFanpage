import { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer({ song, isPlaying, onPlay }) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(240); // Mặc định

  const getYouTubeId = (url) => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    if (!isPlaying) return;

    // Nếu YouTube API chưa có, tải nó
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      tag.onload = () => {
        if (window.YT) loadVideo();
      };
    } else {
      loadVideo();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const loadVideo = () => {
    const videoId = getYouTubeId(song.src);
    if (!videoId || !playerRef.current) return; // 🔥 Kiểm tra playerRef trước khi dùng

    const newPlayer = new window.YT.Player(playerRef.current, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0, // Ẩn thanh tua mặc định của YouTube
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        disablekb: 1, // Chặn tua bằng bàn phím
      },
      events: {
        onReady: (event) => {
          setPlayer(event.target);
          setVideoDuration(event.target.getDuration());
        },
        onStateChange: (event) => {
          if (event.data === 1) {
            intervalRef.current = setInterval(() => {
              setCurrentTime(event.target.getCurrentTime());
              setProgress((event.target.getCurrentTime() / event.target.getDuration()) * 100);
            }, 1000);
          } else {
            clearInterval(intervalRef.current);
          }
        },
      },
    });

    setPlayer(newPlayer);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    setProgress((newTime / videoDuration) * 100);
  };

  const handleSeekEnd = () => {
    if (player) {
      player.seekTo(currentTime, true);
    }
  };

  const handleClickOnProgress = (e) => {
    if (!player) return; // Đảm bảo player đã sẵn sàng
  
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left; // Lấy vị trí click
    const newTime = (clickPosition / rect.width) * videoDuration; // Tính thời gian mới
  
    setCurrentTime(newTime);
    setProgress((newTime / videoDuration) * 100);
    
    player.seekTo(newTime, true); // 🔥 Gọi API YouTube để tua video
  };
  

  return (
    <div className="music-card">
      {isPlaying ? (
        <>
          <div className="music-video-wrapper">
            <div ref={playerRef} className="music-video"></div>
          </div>

          <div className="progress-container" onClick={handleClickOnProgress}>
          <input
            type="range"
            min="0"
            max={videoDuration}
            value={currentTime}
            onChange={handleSeek}
            onMouseUp={handleSeekEnd}
            className="progress-slider"
            style={{ "--progress": `${progress}%` }}
          />
        </div>


        </>
      ) : (
        <div className="thumbnail" onClick={onPlay}>
          <img src={`https://img.youtube.com/vi/${getYouTubeId(song.src)}/hqdefault.jpg`} alt={song.title} className="thumbnail-image" />
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
