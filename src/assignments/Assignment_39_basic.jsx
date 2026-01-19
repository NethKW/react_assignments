import React, { useEffect, useState } from "react";
import "./Assignment_39_basic.css";
import inputData from "../scripts/hidato.json";

const puzzle = inputData[0];
const { width, height, fixed } = puzzle;
export default function Assignment_39_basic() {

  const [path, setPath] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const empty = Array(height)
      .fill(null)
      .map(() => Array(width).fill(null));

    fixed.forEach(f => {
      empty[f.y][f.x] = f.value;
    });

    setGrid(empty);
  }, []);

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

  const stopDragging = () => {
    setDragging(false);
  };

  const reset = () => {
    setPath([]);
    setDragging(false);
  }

  return (
    <div className="main asg-39">
      <div className="grid" onMouseUp={stopDragging} onMouseLeave={stopDragging}>
        {grid.map((row, y) => (
          <div className="row" key={y}>
            {row.map((cell, x) => {

              const index = path.findIndex(p => p.x === x && p.y === y);
              const isActive = index !== -1;
              const number = index + 1;

              return (
                <div
                  key={x}
                  className={`cell ${isActive ? "active" : ""}`}
                  onMouseDown={() => handleMouseDown(x, y)}
                  onMouseEnter={() => handleMouseEnter(x, y)}
                >
                  {cell || (isActive && number)}
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
