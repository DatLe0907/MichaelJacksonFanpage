import { useState, useEffect } from "react";
import './Slider.css'
import './Slider-responsive.css'
import slide1 from "../../assets/photo/automatic-slider/slider-1.jpg"
import slide2 from "../../assets/photo/automatic-slider/slider-2.jpg"
import slide3 from "../../assets/photo/automatic-slider/slider-3.jpg"

const slider = [
  {
  index: 1,
  src: slide1,
  text: "I'm happy to be alive, I'm happy to be who I am.",
  },
  {
    index: 2,
    src: slide2,
    text: "To live is to be musical, starting with the blood dancing in your veins. Everything living has a rhythm. Do you feel your music?",
  },
  {
    index: 3,
    src: slide3,
    text: "Lies run sprints, but the truth runs marathons.",
  }
]



export default function AutoImageSlider() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slider.length);
        setFade(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="slider-img" style={{ backgroundImage: `url('${slider[index].src}')` }}></div>
      <div className={`slider-text ${fade ? "fade-in" : "fade-out"}`}>
        <p>{slider[index].text}</p>
        <span>~Michael Jackson</span>
      </div>
    </div>
  );
}
