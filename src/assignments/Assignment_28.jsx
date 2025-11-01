import { useState, useRef } from "react";
import "./Assignment_28.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

function Assignment_28() {
  const [slides, setSlides] = useState([
    { id: 1, text: "WELCOME TO SLIDE 1", bg: "#0b307eff", animation: "fade" },
    { id: 2, text: "SLIDE 2", bg: "#7e4c0bff", animation: "blur" },
  ]);

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const colors = ["#05163a", "#4d0505", "#04421b", "#522607", "#24053f"];
  const animations = ["fade", "up", "down", "blur", "rotate"];

  const handlePlay = () => {
    const elem = containerRef.current;
    if (elem.requestFullscreen) elem.requestFullscreen();
    setIsPlaying(true);
  };

  const handleExit = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    setIsPlaying(false);
  };

  const handleNextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);
  const handlePrevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const addSlide = () => {
    setSlides([
      ...slides,
      {
        id: Date.now(),
        text: `SLIDE ${slides.length + 1}`,
        bg: "#475569",
        animation: "fade",
      },
    ]);
  };

  const deleteSlide = (index) => {
    if (slides.length > 1) {
      const updated = slides.filter((_, i) => i !== index);
      setSlides(updated);
      setCurrent(Math.max(0, index - 1));
    }
  };

  const updateSlide = (key, value) => {
    const updated = [...slides];
    updated[current][key] = value;
    setSlides(updated);
  };

  const applyAnimation = (anim) => {
    const updated = [...slides];
    updated[current].animation = anim;
    setSlides(updated);
  };

  return (
    <div
      ref={containerRef}
      className={`${isPlaying
          ? "asg-28 w-screen h-screen bg-black flex items-center justify-center"
          : "asg-28 main"
        }`}
    >
      {!isPlaying ? (
        <div className="slide-contain">
          <div className="slide-list">
            {slides.map((s, i) => (
              <div
                key={s.id}
                className={`slides ${i === current ? "active" : ""}`}
                style={{ background: s.bg }}
                onClick={() => setCurrent(i)}
              >
                {s.text.slice(0, 1)}
                <div
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSlide(i);
                  }}
                >
                  <DeleteOutlineIcon />
                </div>
              </div>
            ))}
            <div className="slides add" onClick={addSlide}>
              <AddIcon />
            </div>
          </div>

          <div className="slide" style={{ background: slides[current].bg }}>
            <div>
              <input
                spellCheck="false"
                value={slides[current].text}
                onChange={(e) => updateSlide("text", e.target.value)}
              />
            </div>

            <div className="bottom-bar">
              <div className="colors">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    className="color"
                    style={{ background: c }}
                    onClick={() => updateSlide("bg", c)}
                  />
                ))}
              </div>
              <div >
                <button onClick={handlePlay} className="play">
                  <PlayArrowIcon />
                </button>
              </div>

              <div className="animations">
                {animations.map((a) => (
                  <button
                    key={a}
                    className="animation-btn"
                    onClick={() => applyAnimation(a)}
                  >
                    {a.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`slideshow ${slides[current].animation}`}
          style={{ background: slides[current].bg }}
        >
          <h1>{slides[current].text}</h1>
          <div className="nav-buttons">
            <button className="prev" onClick={handlePrevSlide}>
              <ArrowBackIosIcon/>
            </button>
            <button className="next" onClick={handleNextSlide}>
              <ArrowForwardIosIcon/>
            </button>
          </div>
          <button className="exit" onClick={handleExit}>
            <CloseIcon/>
          </button>
        </div>
      )}
    </div>
  );
}

export default Assignment_28;
