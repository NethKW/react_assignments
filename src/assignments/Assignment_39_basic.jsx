import React, { useEffect, useState } from "react";
import "./Assignment_39_basic.css";
import inputData from "../scripts/hidato.json";

const puzzle = inputData[0];
const { width, height, fixed } = puzzle;
export default function Assignment_39_basic() {

  const [path, setPath] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [grid, setGrid] = useState([]);
  const [win, setWin] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [wrongCells, setWrongCells] = useState([]);

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

      return index !== -1 ? prev.slice(0, index + 1) : [...prev, { x, y }];
    });
  };

  const stopDragging = () => {
    setDragging(false);

    if (path.length === 0) return;

    const wrong = fixed.filter(f => {
      const index = path.findIndex(p => p.x === f.x && p.y === f.y);
      return index !== -1 && index + 1 !== f.value;
    });

    setWrongCells(wrong);

    if (path.length === width * height && wrong.length === 0) {
      setWin(true);
      setIncomplete(false);
    } else if (path.length < width * height) {
      setWin(false);
      setIncomplete(true);
    } else {
      setWin(false);
      setIncomplete(false);
    }
  };

  const reset = () => {
    setPath([]);
    setDragging(false);
    setWin(false);
    setIncomplete(false);
    setWrongCells([]);
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
              const isFixed = cell !== null;
              const isWrong = wrongCells.some(
                c => c.x === x && c.y === y
              );
              const showRed = isWrong || (incomplete && !isActive);


              return (
                <div
                  key={x}
                  className="cell"
                  data-fixed={isFixed}
                  data-active={isActive}
                  data-dragging={dragging && isActive}
                  data-win={!dragging && isActive && !showRed}
                  data-error={showRed}
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
      {win && <div className="win">🎉 You Win!</div>}
    </div>
  );
}
