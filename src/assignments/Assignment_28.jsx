import { useState, useRef } from "react";
import "./Assignment_28.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import AnimationIcon from '@mui/icons-material/Animation';

const colors = ["#05163a", "#4d0505", "#04421b", "#522607", "#24053f"];
const animations = ["fade", "up", "down", "blur", "rotate"];
const fonts = ["Arial", "Poppins", "Gigi", "Georgia", "Segoe Print", "Times New Roman"];

function Assignment_28() {
  const [slides, setSlides] = useState([
    { id: 1, text: "WELCOME TO SLIDE 1", bg: "#0b307eff", animation: "fade", fontSize: 32, fontFamily: "Arial", fontStyle: "normal", fontWeight: "normal", textDecoration: "none", animationDuration: 1.5 },
    { id: 2, text: "SLIDE 2", bg: "#7e4c0bff", animation: "blur", fontSize: 32, fontFamily: "Arial", fontStyle: "normal", fontWeight: "normal", textDecoration: "none", animationDuration: 1.5 },
  ]);

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const [showFontPanel, setShowFontPanel] = useState(false);
  const [showAnimPanel, setShowAnimPanel] = useState(false);

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
        fontSize: 32,
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",
        animationDuration: 1.5,
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
                style={{
                  fontSize: `${slides[current].fontSize}px`,
                  fontFamily: slides[current].fontFamily,
                  fontStyle: slides[current].fontStyle,
                  fontWeight: slides[current].fontWeight,
                  textDecoration: slides[current].textDecoration,
                }}
              />
            </div>

            <div className="font-edit" onClick={() => setShowFontPanel(!showFontPanel)}>
              <FormatSizeIcon />
            </div>

            {showFontPanel && (
              <div className="font-tab">
                <h4>Text Style</h4>

                <label>Font Family:</label>
                <select
                  value={slides[current].fontFamily}
                  onChange={(e) => updateSlide("fontFamily", e.target.value)}
                >
                  {fonts.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>

                <label>Font Size:</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={slides[current].fontSize}
                  onChange={(e) => updateSlide("fontSize", parseInt(e.target.value))}
                />

                <div className="font-style">
                  <button
                    className={slides[current].fontWeight === "bold" ? "active" : ""}
                    onClick={() =>
                      updateSlide("fontWeight", slides[current].fontWeight === "bold" ? "normal" : "bold")
                    }
                  >
                    <b>B</b>
                  </button>
                  <button
                    className={slides[current].fontStyle === "italic" ? "active" : ""}
                    onClick={() =>
                      updateSlide("fontStyle", slides[current].fontStyle === "italic" ? "normal" : "italic")
                    }
                  >
                    <i>I</i>
                  </button>
                  <button
                    className={slides[current].textDecoration === "underline" ? "active" : ""}
                    onClick={() =>
                      updateSlide(
                        "textDecoration",
                        slides[current].textDecoration === "underline" ? "none" : "underline"
                      )
                    }
                  >
                    <u>U</u>
                  </button>
                </div>
              </div>
            )}

            <div className="anim-edit" onClick={() => setShowAnimPanel(!showAnimPanel)}>
              <AnimationIcon />
            </div>

            {showAnimPanel && (
              <div className="anim-tab">
                <h4>Animation Duration</h4>
                <label>Duration (seconds):</label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={slides[current].animationDuration}
                  onChange={(e) => updateSlide("animationDuration", parseFloat(e.target.value))}
                />
                <span>{slides[current].animationDuration}s</span>
              </div>
            )}


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
                    className={`animation-btn ${slides[current].animation === a ? "active" : ""}`}
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
          style={{
            background: slides[current].bg,
            fontSize: `${slides[current].fontSize}px`,
            fontFamily: slides[current].fontFamily,
            fontStyle: slides[current].fontStyle,
            fontWeight: slides[current].fontWeight,
            textDecoration: slides[current].textDecoration,
            "--anim-duration": `${slides[current].animationDuration}s`,
          }}
        >
          <h1>{slides[current].text}</h1>
          <div className="nav-buttons">
            <button className="prev" onClick={handlePrevSlide}>
              <ArrowBackIosIcon />
            </button>
            <button className="next" onClick={handleNextSlide}>
              <ArrowForwardIosIcon />
            </button>
          </div>
          <button className="exit" onClick={handleExit}>
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Assignment_28;
