import React, { useEffect, useState } from "react";
import "./Assignment_40.css";

// eslint-disable-next-line no-unused-vars
const exampleValidGrid = [
  [2, 1, 4, 3],
  [3, 4, 1, 2],
  [1, 3, 2, 4],
  [4, 2, 3, 1]
]
const createRandomRow = () => {
  return [1, 2, 3, 4].sort(() => Math.random() - 0.5);
};

const createRandomGrid = () => {
  const newGrid = [];
  for (let i = 0; i < 4; i++) {
    newGrid.push(createRandomRow());
  }
  return newGrid;
};

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

const createSudoku = () => {
  let isValid = false;
  let answer = [];

  while (!isValid) {
    answer = createRandomGrid();
    isValid = validateGrid(answer);
  }

  const challenge = Array.from({ length: 4 }, () =>
    Array(4).fill(null)
  );

  for (let row = 0; row < 4; row += 2) {
    for (let col = 0; col < 4; col += 2) {

      const r = row + Math.floor(Math.random() * 2);
      const c = col + Math.floor(Math.random() * 2);

      challenge[r][c] = answer[r][c];
    }
  }

  return { answer, challenge };
};


export default function Assignment_40() {
  const [isValid, setIsValid] = useState(false);
  const [grid, setGrid] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [challenge, setChallenge] = useState([]);
  const [result, setResult] = useState("");

  const checkGrid = () => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === null) {
          setResult("Please fill all cells");
          return;
        }

        if (grid[r][c] !== answer[r][c]) {
          setResult("wrong sudoku");
          return;
        }
      }
    }

    setResult("You are correct....!");
  };


  const handleClick = (rIndex, cIndex) => {
    if (challenge[rIndex][cIndex] !== null) return;

    setGrid(prevGrid => prevGrid.map((row, r) =>
      row.map((cell, c) => {
        if (r === rIndex && c === cIndex) {
          if (cell === null || cell === 4) return 1;
          return cell + 1;
        }
        return cell;
      })))
  }

  useEffect(() => {
    const { answer, challenge } = createSudoku();
    console.log("ANSWER GRID:");
    console.table(answer);

    console.log("CHALLENGE GRID:");
    console.table(challenge);

    setAnswer(answer);
    setGrid(challenge);
    setChallenge(challenge);
    setIsValid(true);
  }, []);

  return (
    <div className="main asg-40">
      <div className="grid">
        {grid.map((row, rIndex) => (
          <div className="row" key={rIndex}>
            {row.map((cell, cIndex) => (
              <div className="cell" key={cIndex}
                data-fixed={challenge[rIndex][cIndex] !== null}
                onClick={() => handleClick(rIndex, cIndex)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="check-btn" onClick={checkGrid}>
        Check
      </button>

      {result && <p className="result">{result}</p>}

    </div>
  );
}