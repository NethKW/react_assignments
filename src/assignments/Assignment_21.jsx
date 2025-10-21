import React, { useRef, useState } from "react";
import "./Assignment_21.css";
import color_picker from "../assets/color-picker (1).png";

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.padStart(2, "0");
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function Assignment_21() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [color, setColor] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const objectURL = URL.createObjectURL(file);
    setImageURL(objectURL);
  };

  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;
    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixel;
    const hex = rgbToHex(r, g, b);
    setColor({ r, g, b, hex });
  };


  return (
    <div className="asg-21 color-picker">
      <div className="color-picker-header">
        <img src={color_picker} alt="color_picker" className="color-picker" />
        <h1>... Color Picker ...</h1>
      </div>

      <label className="upload-btn">
        Upload Image
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </label>

      {imageURL && (
        <div className="canvas-section">
          <img
            ref={imgRef}
            src={imageURL}
            alt="uploaded"
            style={{ display: "none" }}
            onLoad={handleImageLoad}
          />
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="canvas"
          ></canvas>
        </div>
      )}

      {color && (
        <div className="color-info">
          <div
            className="color-box"
            style={{ backgroundColor: color.hex }}
          ></div>
          <p>
            <strong>RGB:</strong> rgb({color.r}, {color.g}, {color.b})
          </p>
          <p>
            <strong>HEX:</strong> {color.hex}
          </p>
        </div>
      )}
    </div>
  );
}

export default Assignment_21;
