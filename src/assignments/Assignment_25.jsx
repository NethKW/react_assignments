import React, { useRef, useState } from "react";
import "./Assignment_25.css";
import cropIcon from "../assets/clone.gif";

function Assignment_24() {
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());
  const [imageURL, setImageURL] = useState(null);

  const [cloneArea, setCloneArea] = useState(null);
  const [cloneSize, setCloneSize] = useState(100);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const objectURL = URL.createObjectURL(file);
    setImageURL(objectURL);

    imgRef.current.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = imgRef.current.width;
      canvas.height = imgRef.current.height;
      ctx.drawImage(imgRef.current, 0, 0);
    };
    imgRef.current.src = objectURL;
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const canvas = canvasRef.current
    const x = e.clientX - rect.left - cloneSize / 2;
    const y = e.clientY - rect.top - cloneSize / 2;

    const clampedX = Math.min(Math.max(x, 0), canvas.width - cloneSize);
    const clampedY = Math.min(Math.max(y, 0), canvas.height - cloneSize);
    setCursorPos({ x: clampedX, y: clampedY });
  };

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clampedX = Math.min(Math.max(x, cloneSize / 2), canvas.width - cloneSize / 2);
    const clampedY = Math.min(Math.max(y, cloneSize / 2), canvas.height - cloneSize / 2);

    if (!cloneArea) {
      setCloneArea({ x: clampedX, y: clampedY });
    } else {
      const { x: sx, y: sy } = cloneArea;
      const imageData = ctx.getImageData(
        sx - cloneSize / 2,
        sy - cloneSize / 2,
        cloneSize,
        cloneSize
      );
      ctx.putImageData(imageData, clampedX - cloneSize / 2, clampedY - cloneSize / 2);
    }
  };

  const handleReset = () => {
    setCloneArea(null);
  };

  return (
    <div className="main asg-25">
      {cropIcon && <img src={cropIcon} alt="icon" className="clone-icon" />}
      <h1>Image Clone Tool</h1>

      <label className="upload-btn">
        Upload Image
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </label>

      {imageURL && (
        <div className="canvas-section">
          <div className="canvas-wrapper">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
              className="canvas"
            />

            {cloneArea && (
              <div
                className="clone-origin"
                style={{
                  width: cloneSize,
                  height: cloneSize,
                  left: cloneArea.x - cloneSize / 2,
                  top: cloneArea.y - cloneSize / 2,
                }}
              />
            )}

            <div
              className="clone-preview"
              style={{
                width: cloneSize,
                height: cloneSize,
                left: cursorPos.x,
                top: cursorPos.y,
              }}
            />
          </div>

          <div className="controls">
            <label>
              Clone Size: {cloneSize}px
              <input
                type="range"
                min="10"
                max="200"
                value={cloneSize}
                onChange={(e) => setCloneSize(parseInt(e.target.value))}
              />
            </label>

            <button className="crop-btn" onClick={handleReset}>
              Reset Origin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assignment_24;
