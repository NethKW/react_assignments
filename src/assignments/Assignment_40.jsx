import React, { useEffect, useState } from "react";
import "./Assignment_40.css";

const exampleValidGrid = [
  [2, 1, 4, 3],
  [3, 4, 1, 2],
  [1, 3, 2, 4],
  [4, 2, 3, 1]
]

export default function Assignment_40() {
  const [isValid, setIsValid] = useState(false);

  const isValidColumns = grid => {
    for (let col = 0; col < 4; col++) {
      const values = new Set();
      for (let row = 0; row < 4; row++) {
        if (values.has(grid[row][col])) return false;
        values.add(grid[row][col]);
      }
    }
    return true;
  };

  const isValidBoxes = grid => {
    for (let row = 0; row < 4; row += 2) {
      for (let col = 0; col < 4; col += 2) {
        const values = new Set();
        for (let r = row; r < row + 2; r++) {
          for (let c = col; c < col + 2; c++) {
            if (values.has(grid[r][c])) return false;
            values.add(grid[r][c]);
          }
        }
      }
    }
    return true;
  };

  const validateGrid = grid => {
    return isValidColumns(grid) && isValidBoxes(grid);
  };

  useEffect(() => {
    const valid = validateGrid(exampleValidGrid);
    setIsValid(valid);

    console.log("Grid Valid:", valid);
  }, []);

  return (
    <div className="main asg-40">
      <div className="grid">
        {exampleValidGrid.map((row, rIndex) => (
          <div className="row" key={rIndex}>
            {row.map((cell, cIndex) => (
              <div className="cell" key={cIndex}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>{isValid ? "Valid" : "Invalid"} </p>
    </div>
  );
}