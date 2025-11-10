import React, { useState } from "react";
import "./Assignment_31.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const getCoords = (n, radius, rotation) => {
  const coords = [];
  const angleStep = (2 * Math.PI) / n;
  const rotationRad = (rotation * Math.PI) / 180;

  for (let i = 0; i < n; i++) {
    const angle = i * angleStep + rotationRad;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    coords.push({ x, y });
  }
  return coords;
};
const items = [
  "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10",
];

function Assignment_31() {
  const radius = 300;
  const [rotation, setRotation] = useState(0);

  const nextSlide = () => setRotation((prev) => prev - 36);
  const prevSlide = () => setRotation((prev) => prev + 36);
  const coords = getCoords(items.length, radius, rotation);

  return (
    <div className="asg-31 main">
      <div className="card-section">
        <button className="btn left" onClick={prevSlide}><ArrowBackIcon/></button>
        <div className="card">
          {items.map((item, i) => {
            const { x, y } = coords[i];
            const scale = y < 0 ? 1 : 0;
            const zIndex = y < 0 ? 2 : 1;
            const opacity = y < -10 ? 1 : 0;

            return (
              <div
                key={i}
                className="card-item"
                style={{
                  transform: `translateX(${x}px) translateY(${y / 50}px) scale(${scale})`, opacity, zIndex,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
        <button className="btn right" onClick={nextSlide}><ArrowForwardIcon/></button>
      </div>
    </div>
  );
}

export default Assignment_31;
