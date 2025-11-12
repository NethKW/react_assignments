import React, { useState, useEffect } from "react";
import words from "../scripts/word-jumble.json";
import "./Assignment_32.css";

const rows = 10;
const cols = 10;
const WORD_COUNT = 8;

const getRandomLetter = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

function Assignment_32s() {
  const [grid, setGrid] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [wordsToFind, setWordsToFind] = useState([]);

  const selectRandomWords = () => {
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    setWordsToFind(shuffled.slice(0, WORD_COUNT));
  };

  const generateGrid = () => {
    if (wordsToFind.length === 0) return;

    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "")
    );

    wordsToFind.forEach((word) => {
      const wordLength = word.length;
      let placed = false;

      while (!placed) {
        const direction = Math.random() < 0.5 ? "H" : "V";
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        if (direction === "H" && col + wordLength <= cols) {
          let canPlace = true;
          for (let i = 0; i < wordLength; i++) {
            if (newGrid[row][col + i] !== "") {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < wordLength; i++) {
              newGrid[row][col + i] = word[i];
            }
            placed = true;
          }
        } else if (direction === "V" && row + wordLength <= rows) {
          let canPlace = true;
          for (let i = 0; i < wordLength; i++) {
            if (newGrid[row + i][col] !== "") {
              canPlace = false;
              break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < wordLength; i++) {
              newGrid[row + i][col] = word[i];
            }
            placed = true;
          }
        }
      }
    });

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newGrid[r][c] === "") {
          newGrid[r][c] = getRandomLetter();
        }
      }
    }

    setGrid(newGrid);
    setFoundWords([]);
    setSelectedCells([]);
    setFoundCells([]);
  };

  useEffect(() => {
    selectRandomWords();
  }, []);

  useEffect(() => {
    if (wordsToFind.length > 0) {
      generateGrid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsToFind]);

  const handleMouseDown = (r, c) => {
    setIsSelecting(true);
    setSelectedCells([[r, c]]);
  };

  const handleMouseEnter = (r, c) => {
    if (isSelecting) {
      setSelectedCells((prev) => {
        const [first] = prev;
        if (first[0] === r || first[1] === c) {
          return [...prev, [r, c]];
        }
        return prev;
      });
    }
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;

    const sorted = [...selectedCells].sort(
      ([r1, c1], [r2, c2]) => r1 - r2 || c1 - c2
    );

    const selectedWord = sorted.map(([r, c]) => grid[r][c]).join("");
    const reversedWord = selectedWord.split("").reverse().join("");

    const found = wordsToFind.find(
      (word) => word === selectedWord || word === reversedWord
    );

    if (found && !foundWords.includes(found)) {
      setFoundWords([...foundWords, found]);
      setFoundCells((prev) => [...prev, ...sorted]);
    }

    setIsSelecting(false);
    setSelectedCells([]);
  };

  const isCellSelected = (r, c) =>
    selectedCells.some(([sr, sc]) => sr === r && sc === c);
  const isCellFound = (r, c) =>
    foundCells.some(([fr, fc]) => fr === r && fc === c);

  return (
    <div className="asg-32 main" onMouseUp={handleMouseUp}>
      <h1>Word Search Puzzle</h1>
      <div className="puzzle-wrapper">
        <div className="puzzle-container">
          {grid.map((row, rIndex) => (
            <div key={rIndex} className="row">
              {row.map((letter, cIndex) => (
                <div
                  key={cIndex}
                  className={`cell ${isCellSelected(rIndex, cIndex) ? "selected" : ""} 
                    ${isCellFound(rIndex, cIndex) ? "found" : ""}`}
                  onMouseDown={() => handleMouseDown(rIndex, cIndex)}
                  onMouseEnter={() => handleMouseEnter(rIndex, cIndex)}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="word-list">
          <h3>Find these words:</h3>
          {wordsToFind.map((word, i) => (
            <div
              key={i}
              className={`word-item ${foundWords.includes(word) ? "word-found" : ""}`}
            >
              {word}
            </div>
          ))}
          <button onClick={() => { selectRandomWords(); }} className="shuffle-btn">
            New Puzzle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assignment_32s;
