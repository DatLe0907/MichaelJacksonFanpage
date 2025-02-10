import "./Music.css"
import MusicPlayer from "./MusicPlayer";
import { useState } from "react";
const songs = [
  { title: "Thriller", author: "Michael Jackson", album: "Thriller", src: "https://www.youtube.com/embed/4V90AmXnguw?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Billie Jean", author: "Michael Jackson", album: "Thriller", src: "https://www.youtube.com/embed/Zi_XLOBDo_Y?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Beat It", author: "Michael Jackson", album: "Thriller", src: "https://www.youtube.com/embed/oRdxUFDoQe0?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Smooth Criminal", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/sFvENQBc-F8?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Black or White", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/F2AitTPI5U0?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Man in the Mirror", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/PivWY9wn5ps?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Earth Song", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/XAi3VTSdTxU?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Heal the World", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/BWf-eARnf6U?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "You Are Not Alone", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/pAyKJAtDNCw?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Bad", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/dsUXAEzaC3Q?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Rock with You", author: "Michael Jackson", album: "Off the Wall", src: "https://www.youtube.com/embed/5X-Mrc2l1d0?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Don't Stop 'Til You Get Enough", author: "Michael Jackson", album: "Off the Wall", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Remember the Time", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/LeiFF0gvqcc?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "The Way You Make Me Feel", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/HzZ_urpj4As?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "They Don't Care About Us", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/QNJL6nfu__Q?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Blood on the Dance Floor", author: "Michael Jackson", album: "Blood on the Dance Floor", src: "https://www.youtube.com/embed/c3_NntYhzV4?si=6_Wef2t-PQ06Sh39?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Ghosts", author: "Michael Jackson", album: "Blood on the Dance Floor", src: "https://www.youtube.com/embed/Xh9Cp4rd7mI?si=bo1ddN5SBZFxQw3S?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Leave Me Alone", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/crbFmpezO4A?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Who Is It", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/PfrV_6yWbEg?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Stranger in Moscow", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/pEEMi2j6lYE?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Another Part of Me", author: "Michael Jackson", album: "Bad", src: "ttps://www.youtube.com/embed/8vwHQNQ88cM?si=KOVgVafeZi5UBljr?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Scream", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/0P4A1K4lXDo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Give In to Me", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/LJ7qXHjxj_0?si=M3F-KW9x0mhFVZeh?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Dirty Diana", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/yUi_S6YWjZw?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Will You Be There", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/jQY_QL_wvQU?si=D4b_QBPFYuUaVO5x?rel=0&controls=0&modestbranding=1&showinfo=0" }
  
];


export default function Music() {
  const [currentPlaying, setCurrentPlaying] = useState(null);

  const handlePlay = (index) => {
    // Nếu video đang phát, dừng video đó
    setCurrentPlaying(currentPlaying === index ? null : index);
  };

  return (
    <div className="Music">
      <h1 className="Music-heading">Michael Jackson’s 50 Top Songs</h1>
      <div className="Music-box">
      {songs.map((song, index) => (
        <div className="Music-video" key={index}>
          <MusicPlayer 
            song={song} 
            isPlaying={currentPlaying === index} 
            onPlay={() => handlePlay(index)} // truyền vào sự kiện onPlay
          />
        </div>
      ))}
      </div>
    </div>
  );
}
