import React, { useEffect, useState, useRef } from "react";
import "./Assignment_30.css";

function Assignment_30() {
  const [analyser, setAnalyser] = useState(null);
  const [bars, setBars] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const audioRef = useRef(null);
  const lyricsBoxRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    const refs = Array.from({ length: 32 }, () => React.createRef());
    setBars(refs);
  }, []);

  useEffect(() => {
    fetch("./audio/Ordinary.srt")
      .then((res) => res.text())
      .then((text) => {
        const parsed = parseSRT(text);
        setLyrics(parsed);
      })
      .catch((err) => console.error("Error loading SRT file:", err));
  }, []);

  const parseSRT = (srtText) => {
    const blocks = srtText.trim().split(/\n\s*\n/);
    return blocks.map((block) => {
      const lines = block.split("\n");
      const time = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
      if (time) {
        return {
          start: toSeconds(time[1]),
          end: toSeconds(time[2]),
          text: lines.slice(2).join(" ")
        };
      }
      return null;
    })
      .filter(Boolean);
  };

  const toSeconds = (t) => {
    const [h, m, s] = t.split(":");
    const [sec, ms] = s.split(",");
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + parseInt(ms) / 1000;
  };

  const handlePlay = async () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const audio = audioRef.current;
    const src = ctx.createMediaElementSource(audio);
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 64;

    src.connect(analyserNode);
    analyserNode.connect(ctx.destination);
    setAnalyser(analyserNode);

    if (audio.paused) {
      await audio.play();
    }
  };

  useEffect(() => {
    if (!analyser) return;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      bars.forEach((bar, i) => {
        const value = dataArray[i];
        const maxHeight = 170;
        const normalized = (value / 255) * maxHeight;
        bar.current.style.height = `${normalized}px`;
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [analyser, bars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncLyrics = () => {
      const currentTime = audio.currentTime;
      const index = lyrics.findIndex(
        (l) => currentTime >= l.start && currentTime <= l.end
      );
      if (index !== -1) {
        setCurrentIndex(prev => (prev !== index ? index : prev));
      }
    };

    audio.addEventListener("timeupdate", syncLyrics);
    return () => audio.removeEventListener("timeupdate", syncLyrics);
  }, [lyrics, currentIndex]);

  useEffect(() => {
    if (currentIndex === -1) return;
    const line = lineRefs.current[currentIndex].current;
    const container = lyricsBoxRef.current;
    if (line && container) {
      const lineTop = line.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;
      const offset = lineTop - containerTop - container.clientHeight / 2 + line.clientHeight / 2;
      container.scrollBy({ top: offset, behavior: "smooth" });
    }
  }, [currentIndex]);


  const handleLineClick = (startTime) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = startTime;
      audio.play();
    }
  };

  return (
    <div className="asg-30 main">
      <div className="audio">
        <h1>Audio Visualizer with Lyrics</h1>

        <div className="audio-box">
          {bars.map((ref, i) => (
            <div key={i} ref={ref} className="bar"></div>
          ))}
        </div>

        <div className="controls">
          <audio
            ref={audioRef}
            className="audio-player"
            src="./audio/Ordinary.mp3"
            controls
            onPlay={handlePlay}
          ></audio>
        </div>

        <div className="lyrics-scroll" ref={lyricsBoxRef}>
          {lyrics.map((line, i) => {
            lineRefs.current[i] = lineRefs.current[i] || React.createRef();
            return (
              <p
                key={i}
                ref={lineRefs.current[i]}
                className={`lyric-line ${i === currentIndex ? "active-line" : ""
                  }`}
                onClick={() => handleLineClick(line.start)}
              >
                {line.text}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Assignment_30;
