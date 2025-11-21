import React, { useEffect, useState } from "react";
import "./Assignment_37.css";
import puzzleImage from "../assets/puzzle.avif";

const size = 3;
const tileSize = 120;

const solvedGrid = () => {
  const grid = [];
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      row.push(r * size + c);
    }
    grid.push(row);
  }
  return grid;
};

function Assignment_37() {
  const [tiles, setTiles] = useState(solvedGrid());
  const [empty, setEmpty] = useState({ row: size - 1, col: size - 1 });
  const [isSolved, setIsSolved] = useState(true);

  const moveTile = ({ dr, dc }) => {
    const { row, col } = empty;

    const nr = row + dr;
    const nc = col + dc;
    if (nr < 0 || nr >= size || nc < 0 || nc >= size) return;
    const newTiles = tiles.map((r) => [...r]);

    [newTiles[row][col], newTiles[nr][nc]] = [
      newTiles[nr][nc],
      newTiles[row][col],
    ];

    setTiles(newTiles);
    setEmpty({ row: nr, col: nc });
    setIsSolved(checkSolved(newTiles));
  };

  const shuffleMoves = () => {
    const directions = [
      { dr: 1, dc: 0 },
      { dr: -1, dc: 0 },
      { dr: 0, dc: 1 },
      { dr: 0, dc: -1 },
    ];

    let grid = solvedGrid();
    let hole = { row: size - 1, col: size - 1 };

    for (let i = 0; i < 200; i++) {
      const move = directions[Math.floor(Math.random() * 4)];
      const { dr, dc } = move;

      const nr = hole.row + dr;
      const nc = hole.col + dc;

      if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;

      const newGrid = grid.map((r) => [...r]);

      [newGrid[hole.row][hole.col], newGrid[nr][nc]] = [
        newGrid[nr][nc],
        newGrid[hole.row][hole.col],
      ];

      grid = newGrid;
      hole = { row: nr, col: nc };
    }

    setTiles(grid);
    setEmpty(hole);
    setIsSolved(false);
  };

  const checkSolved = (grid) => {
    for (let r = 0; r < size; r++)
      for (let c = 0; c < size; c++)
        if (grid[r][c] !== r * size + c) return false;
    return true;
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (isSolved) return;

      const key = e.key.toLowerCase();

      if (key === "arrowup" || key === "w") moveTile({ dr: 1, dc: 0 });
      if (key === "arrowdown" || key === "s") moveTile({ dr: -1, dc: 0 });
      if (key === "arrowleft" || key === "a") moveTile({ dr: 0, dc: 1 });
      if (key === "arrowright" || key === "d") moveTile({ dr: 0, dc: -1 });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    shuffleMoves();
  }, []);

  return (
    <div className="main asg-37">
      <div className="puzzle">
        <h2>Sliding Puzzle</h2>
        <h3>Use Arrow Keys or W/A/S/D to move tiles.</h3>
        <div className="puzzle-img">
          <img src={puzzleImage} />
        </div>

        <div
          className="puzzle-grid"
          style={{ width: tileSize * size, height: tileSize * size }}
        >
          {tiles.map((row, r) =>
            row.map((val, c) => {
              if (r === empty.row && c === empty.col) return null;

              const x = (val % size) * -tileSize;
              const y = Math.floor(val / size) * -tileSize;

              return (
                <div
                  key={val}
                  className="puzzle-tile"
                  style={{
                    width: tileSize,
                    height: tileSize,
                    left: c * tileSize,
                    top: r * tileSize,
                    backgroundImage: `url(${puzzleImage})`,
                    backgroundSize: `${tileSize * size}px ${tileSize * size}px`,
                    backgroundPosition: `${x}px ${y}px`,
                  }}
                />
              );
            })
          )}
        </div>

        {isSolved && (
          <div className="msg">Congratulations! You solved the puzzle!</div>
        )}
      </div>
    </div>
  );
}
export default Assignment_37;
