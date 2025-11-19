import React, { useRef, useState } from "react";
import "./Assignment_36.css";
import sampleVideo from "./video/custom.mp4";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export default function Assignment_36() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const Play = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
    setCurrentTime(video.currentTime);
  };

  const handleSeek = (e) => {
    const time = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = time;
    setProgress(e.target.value);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="main asg-36">
      <div className="videoPlay">

        <h2>Custom Video Player</h2>
        
        <video
          ref={videoRef}
          className="video"
          src={sampleVideo}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(videoRef.current.duration)}
          preload="metadata"
        />

        <div className="controls">
          <button onClick={Play}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
          />
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
