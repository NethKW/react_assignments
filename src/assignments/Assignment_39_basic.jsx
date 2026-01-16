import React, { useState } from "react";
import "./Assignment_39_basic.css";

export default function Assignment_39_basic() {
  const width = 3;
  const height = 3;

  const [path, setPath] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (x, y) => {
    setPath([{ x, y }]);
    setDragging(true);
  };

  const handleMouseEnter = (x, y) => {
    if (!dragging) return;

    setPath(prev => {
      const index = prev.findIndex(p => p.x === x && p.y === y);

      if (index !== -1) {
        return prev.slice(0, index + 1);
      }

      return [...prev, { x, y }];
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseLeave = () => {
    setDragging(false);
  }

  const reset = () => {
    setPath([]);
    setDragging(false);
  }

  return (
    <div className="main asg-39">
      <div className="grid" onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave}>
        {Array.from({ length: height }).map((_, y) => (
          <div className="row" key={y}>
            {Array.from({ length: width }).map((_, x) => {

              const index = path.findIndex(
                p => p.x === x && p.y === y
              );

              const isActive = index !== -1;
              const number = index + 1;

              return (
                <div
                  key={x}
                  className={`cell ${isActive ? "active" : ""}`}
                  onMouseDown={() => handleMouseDown(x, y)}
                  onMouseEnter={() => handleMouseEnter(x, y)}
                >
                  {isActive && number}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="button" onClick={reset}>Reset</button>
    </div>
  );
}
