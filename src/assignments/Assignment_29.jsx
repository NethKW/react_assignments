import React, {useEffect, useState, useRef } from "react";
import "./Assignment_29.css";
import audioFile from "../audio/audio.mp3";

function Assignment_29() {
  const [analyser, setAnalyser] = useState(null);
  const audioRef = useRef(null);
  const [bars, setBars] = useState([]);

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
        const maxHeight = 250;
        const normalized = (value / 255) * maxHeight;
        bar.current.style.height = `${normalized}px`;
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [analyser, bars]);

  useEffect(() => {
    const refs = Array.from({ length: 32 }, () => React.createRef());
    setBars(refs);
  }, []);

  return (
    <div className="asg-29 main">
      <div className="audio">
        <h1>Audio Wave Animation</h1>
        <div className="audio-box">
          {bars.map((ref, i) => (
            <div key={i} ref={ref} className="bar"></div>
          ))}
        </div>

        <div className="controls">
          <audio
            ref={audioRef}
            className="audio-player"
            src={audioFile}
            controls
            onPlay={handlePlay}
          ></audio>
        </div>
      </div>
    </div>
  );
}

export default Assignment_29