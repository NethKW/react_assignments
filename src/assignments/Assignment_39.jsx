import React from "react";
import "./Assignment_39.css";
import inputData from "../scripts/hidato.json";

export default function Assignment_39() {
  const puzzle = inputData[0];
  const { width, height, fixed } = puzzle;

  const getFixedValue = (x, y) => {
    const cell = fixed.find(c => c.x === x && c.y === y);
    return cell ? cell.value : null;
  };

  return (
    <div className="main asg-39">
      <h1>Hidato Game</h1>

      <div className="grid">
        {Array.from({ length: height }).map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {Array.from({ length: width }).map((_, colIndex) => {
              const fixedValue = getFixedValue(colIndex, rowIndex);

              return (
                <div className="cell" key={colIndex}>
                  {fixedValue !== null && (
                    <div className="fixed-cell">
                      {fixedValue}
                    </div>
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
