import React, { useRef, useState } from "react";
import "./Assignment_23.css";
import filterIcon from "../assets/pixel.png";

function Assignment_23() {
  const originalCanvasRef = useRef(null);
  const filteredCanvasRef = useRef(null);
  const [imageURL, setImageURL] = useState(null);
  const [filterSize, setFilterSize] = useState(10);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const objectURL = URL.createObjectURL(file);
    setImageURL(objectURL);

    const img = new Image();
    img.src = objectURL;
    img.onload = () => {
      const canvas = originalCanvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const applyFilter = () => {
    const originalCanvas = originalCanvasRef.current;
    const filteredCanvas = filteredCanvasRef.current;
    if (!originalCanvas || !filteredCanvas) return;

    const w = originalCanvas.width;
    const h = originalCanvas.height;
    filteredCanvas.width = w;
    filteredCanvas.height = h;

    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    const imageData = originalCtx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const size = parseInt(filterSize);

    for (let y = 0; y < h; y += size) {
      for (let x = 0; x < w; x += size) {
        let r = 0, g = 0, b = 0, count = 0;

        for (let yy = y; yy < y + size && yy < h; yy++) {
          for (let xx = x; xx < x + size && xx < w; xx++) {
            const index = (yy * w + xx) * 4;
            r += data[index];
            g += data[index + 1];
            b += data[index + 2];
            count++;
          }
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        filteredCtx.fillStyle = `rgb(${r},${g},${b})`;
        filteredCtx.fillRect(x, y, size, size);
      }
    }
  };

  const handleDownload = () => {
    const filteredCanvas = filteredCanvasRef.current;
    if (!filteredCanvas) return;

    const link = document.createElement("a");
    link.download = "filtered-image.png";
    link.href = filteredCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="main asg-23">
      <div className="filter-header">
        {filterIcon && <img src={filterIcon} alt="icon" className="filter-icon" />}
        <h1>Pixel Filter App</h1>
      </div>

      <label className="upload-btn">
        Upload Image
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </label>

      {imageURL && (
        <div className="filter-section">
          <canvas ref={originalCanvasRef} className="canvas-original"></canvas>
          <canvas ref={filteredCanvasRef} className="canvas-filtered"></canvas>
        </div>
      )}

      {imageURL && (
        <div className="controls">
          <label>
            Filter Size: {filterSize}px
            <input
              type="range"
              min="1"
              max="50"
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
            />
          </label>
          <button onClick={applyFilter} className="apply-btn">Apply Filter</button>
          <button onClick={handleDownload} className="download-btn">Download</button>
        </div>
      )}
    </div>
  );
}

export default Assignment_23;
