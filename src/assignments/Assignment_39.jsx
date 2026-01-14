import React, { useEffect, useState } from "react";
import "./Assignment_39.css";
import inputData from "../scripts/hidato.json";

export default function Assignment_39() {
  const puzzle = inputData[0];
  const { width, height, fixed } = puzzle;
  const grid = width * height;

  const [path, setPath] = useState([]);
  const [currentPos, setCurrentPos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gameStatus, setGameStatus] = useState("playing");
  const [wrongCells, setWrongCells] = useState([]);

  useEffect(() => {
    resetGame();
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

  const isInPath = (x, y) =>
    path.some(p => p.x === x && p.y === y);

  const isPreviousCell = (x, y) => {
    if (path.length < 2) return false;
    const prev = path[path.length - 2];
    return prev.x === x && prev.y === y;
  };

  const resetGame = () => {
    setPath([]);
    setCurrentPos(null);
    setIsDragging(false);
    setGameStatus("playing");
    setWrongCells([]);
  };

  const handleMouseDown = (x, y) => {
  if (gameStatus !== "playing") return;

  const fixedValue = getFixedValue(x, y);
  const startValue = fixedValue ?? 1;

  setPath([{ x, y, value: startValue }]);
  setCurrentPos({ x, y });
  setIsDragging(true);
};

  const handleMouseEnter = (x, y) => {
    if (!isDragging || gameStatus !== "playing") return;
    if (!isNear(x, y)) return;

    if (isPreviousCell(x, y)) {
      setPath(prev => prev.slice(0, -1));
      setCurrentPos({ x, y });
      return;
    }

    if (isInPath(x, y)) return;

    const nextValue = path.length + 1;
    setPath(prev => [...prev, { x, y, value: nextValue }]);
    setCurrentPos({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    validatePath();
  };

  const validatePath = () => {
    if (path.length !== grid) {
      markWrong();
      return;
    }

    const allFixedCorrect = fixed.every(f => {
    const p = path[f.value - 1];
    return p.x === f.x && p.y === f.y;
  });

  if (!allFixedCorrect) {
    markWrong();
    return;
  }

    setGameStatus("success");
  };

  const markWrong = () => {
    const wrong = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!path.some(p => p.x === x && p.y === y)) {
          wrong.push(`${x}-${y}`);
        }
      }
    }
    setWrongCells(wrong);
    setGameStatus("fail");
  };

  return (
    <div className="main asg-39">
      <h1>Hidato Game</h1>

      <div className="grid" onMouseUp={handleMouseUp}>
        {Array.from({ length: height }).map((_, y) => (
          <div className="row" key={y}>
            {Array.from({ length: width }).map((_, x) => {

              const fixedValue = getFixedValue(x, y);
              const pathCell = path.find(p => p.x === x && p.y === y);
              const isWrong = wrongCells.includes(`${x}-${y}`);

              return (
                <div
                  key={x}
                  className={`cell ${isWrong ? "wrong" : ""}`}
                  onMouseDown={() => handleMouseDown(x, y)}
                  onMouseEnter={() => handleMouseEnter(x, y)}
                >
                  {fixedValue !== null && (
                    <div className="fixed-cell fixed">
                      {fixedValue}
                    </div>
                  )}

                  {fixedValue === null && pathCell && (
                    <div className="fixed-cell user">
                      {pathCell.value}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {gameStatus === "success" && (
        <div>Congratulations!</div>
      )}

      {gameStatus === "fail" && (
        <div>You're fail</div>
      )}

      <button onClick={resetGame}>Reset</button>
    </div>
  );
}
