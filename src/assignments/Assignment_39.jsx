import React, { useEffect, useState } from "react";
import "./Assignment_39.css";
import inputData from "../scripts/hidato.json";

export default function Assignment_39() {
  const puzzle = inputData[0];
  const { width, height, fixed } = puzzle;

  const [path, setPath] = useState({});
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPath({ "0-0": true });
    setCurrentPos({ x: 0, y: 0 });
  }, []);

  const getFixedValue = (x, y) => {
    const cell = fixed.find(c => c.x === x && c.y === y);
    return cell ? cell.value : null;
  };

  const isNear = (x, y) => {
    const dx = Math.abs(x - currentPos.x);
    const dy = Math.abs(y - currentPos.y);
    return dx + dy === 1;
  };

  const handleMouseDown = (x, y) => {
    if (x === 0 && y === 0) {
      setIsDragging(true);
    }
  };

  const handleMouseEnter = (x, y) => {
    if (!isDragging) return;
    if (!isNear(x, y)) return;

    const key = `${x}-${y}`;
    if (path[key]) return;

    setPath(prev => ({
      ...prev,
      [key]: true
    }));

    setCurrentPos({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="main asg-39" onMouseUp={handleMouseUp}>
      <h1>Hidato Path</h1>

      <div className="grid">
        {Array.from({ length: height }).map((_, y) => (
          <div className="row" key={y}>
            {Array.from({ length: width }).map((_, x) => {
              const key = `${x}-${y}`;
              const fixedValue = getFixedValue(x, y);
              const isPath = path[key];

              return (
                <div
                  key={x}
                  className="cell"
                  onMouseDown={() => handleMouseDown(x, y)}
                  onMouseEnter={() => handleMouseEnter(x, y)}
                >
                  {fixedValue !== null && (
                    <div className="fixed-cell fixed">{fixedValue}</div>
                  )}

                  {fixedValue === null && isPath && (
                    <div className="fixed-cell user"></div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
