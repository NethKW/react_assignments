import React, { useEffect, useState, useRef } from "react";
import words from "../scripts/word-jumble.json";
import "./Assignment_32.css";

const rows = 10;
const cols = 10;
const WORD_COUNT = 8;
const MAX_PLACEMENT_ATTEMPTS = 200;

const getRandomLetter = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z

function Assignment_32() {
  const [grid, setGrid] = useState([]); // letters matrix
  const [placedWords, setPlacedWords] = useState([]); // { word, positions:[{r,c}], found }
  const [selectedPath, setSelectedPath] = useState([]); // ["r-c", ...] current selection
  const [mouseDown, setMouseDown] = useState(false);
  const [selectStart, setSelectStart] = useState(null); // "r-c" or null
  const containerRef = useRef(null);

  useEffect(() => {
    generatePuzzle();
  }, []);

  // pick up to WORD_COUNT random words (uppercase, length <= max grid dim)
  const chooseRandomWords = () => {
    const maxLen = Math.max(rows, cols);
    const pool = words
      .map((w) => String(w).toUpperCase())
      .filter((w) => w.length <= maxLen && w.length >= 2);
    // shuffle and pick first WORD_COUNT
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, WORD_COUNT);
  };

  // attempt to place words sequentially
  const placeWordsIntoEmptyGrid = (wordArray) => {
    // initialize empty grid with nulls
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(null));
    const placed = [];

    // helper to check and place a word
    const tryPlaceWord = (word) => {
      // try many times to find a valid position & orientation
      for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
        const orientation = Math.random() < 0.5 ? "H" : "V"; // H: horizontal, V: vertical
        const len = word.length;
        let r, c;
        if (orientation === "H") {
          r = Math.floor(Math.random() * rows);
          c = Math.floor(Math.random() * (cols - len + 1));
        } else {
          r = Math.floor(Math.random() * (rows - len + 1));
          c = Math.floor(Math.random() * cols);
        }

        // verify placement: cells empty or same letter
        let fits = true;
        const positions = [];
        for (let i = 0; i < len; i++) {
          const rr = orientation === "H" ? r : r + i;
          const cc = orientation === "H" ? c + i : c;
          const existing = matrix[rr][cc];
          if (existing && existing !== word[i]) {
            fits = false;
            break;
          }
          positions.push({ r: rr, c: cc });
        }
        if (!fits) continue;

        // place letters
        for (let i = 0; i < len; i++) {
          const rr = positions[i].r;
          const cc = positions[i].c;
          matrix[rr][cc] = word[i];
        }

        return positions;
      }
      return null; // failed to place after many attempts
    };

    for (const w of wordArray) {
      const positions = tryPlaceWord(w);
      if (positions) {
        placed.push({ word: w, positions, found: false });
      } else {
        // skip word if can't place
        // (optional: you could try reversing or other heuristics)
      }
    }

    // fill remaining nulls with random letters
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!matrix[r][c]) matrix[r][c] = getRandomLetter();
      }
    }

    return { matrix, placed };
  };

  const generatePuzzle = () => {
    setSelectedPath([]);
    setSelectStart(null);
    setMouseDown(false);

    const chosen = chooseRandomWords();
    const { matrix, placed } = placeWordsIntoEmptyGrid(chosen);
    setGrid(matrix);
    setPlacedWords(placed);
  };

  // id utility
  const idOf = (r, c) => `${r}-${c}`;

  // get positions ids string array for a placed word (in order)
  const positionsToIds = (positions) => positions.map((p) => idOf(p.r, p.c));

  // user selection handling
  const onCellMouseDown = (r, c) => {
    setMouseDown(true);
    const id = idOf(r, c);
    setSelectStart(id);
    setSelectedPath([id]);
  };

  const onCellMouseEnter = (r, c) => {
    if (!mouseDown || !selectStart) return;

    const startParts = selectStart.split("-").map(Number);
    const startR = startParts[0];
    const startC = startParts[1];
    // only allow straight-line selection (H or V)
    if (r !== startR && c !== startC) {
      // not aligned; ignore
      return;
    }

    // compute path from start to current (inclusive)
    const path = [];
    if (r === startR) {
      // horizontal
      const minC = Math.min(startC, c);
      const maxC = Math.max(startC, c);
      for (let cc = minC; cc <= maxC; cc++) path.push(idOf(r, cc));
    } else {
      // vertical
      const minR = Math.min(startR, r);
      const maxR = Math.max(startR, r);
      for (let rr = minR; rr <= maxR; rr++) path.push(idOf(rr, c));
    }
    setSelectedPath(path);
  };

  const onCellMouseUp = () => {
    setMouseDown(false);
    if (selectedPath.length === 0) {
      setSelectStart(null);
      return;
    }
    checkSelection(selectedPath);
    setSelectedPath([]);
    setSelectStart(null);
  };

  // support click start / click end selection
  const onCellClick = (r, c) => {
    const id = idOf(r, c);
    if (!selectStart) {
      // start selection
      setSelectStart(id);
      setSelectedPath([id]);
      return;
    }
    // if start exists, treat as end
    const startParts = selectStart.split("-").map(Number);
    const sr = startParts[0];
    const sc = startParts[1];
    if (sr !== r && sc !== c) {
      // not aligned; reset start to this new cell
      setSelectStart(id);
      setSelectedPath([id]);
      return;
    }

    // build path between sr,sc and r,c
    const path = [];
    if (sr === r) {
      const minC = Math.min(sc, c);
      const maxC = Math.max(sc, c);
      for (let cc = minC; cc <= maxC; cc++) path.push(idOf(r, cc));
    } else {
      const minR = Math.min(sr, r);
      const maxR = Math.max(sr, r);
      for (let rr = minR; rr <= maxR; rr++) path.push(idOf(rr, c));
    }
    checkSelection(path);
    setSelectStart(null);
    setSelectedPath([]);
  };

  // check if the selected path matches any placed word (forward or backward)
  const checkSelection = (pathIds) => {
    if (pathIds.length < 2) return; // ignore single-letter selections
    const matchedIndex = placedWords.findIndex((pw) => {
      const pids = positionsToIds(pw.positions);
      // match exact order or reversed
      if (arraysEqual(pids, pathIds) || arraysEqual([...pids].reverse(), pathIds))
        return true;
      return false;
    });
    if (matchedIndex !== -1) {
      // mark found
      setPlacedWords((prev) => {
        const copy = prev.map((p, i) => (i === matchedIndex ? { ...p, found: true } : p));
        return copy;
      });
    }
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  };

  const cellIsSelected = (r, c) => selectedPath.includes(idOf(r, c));
  const cellIsPartOfFoundWord = (r, c) => {
    for (const pw of placedWords) {
      if (!pw.found) continue;
      for (const p of pw.positions) {
        if (p.r === r && p.c === c) return true;
      }
    }
    return false;
  };

  return (
    <div
      className="asg-32 main"
      onMouseUp={() => {
        // in case mouse up happens outside a cell
        if (mouseDown) onCellMouseUp();
      }}
    >
      <h1>Word Search Puzzle</h1>
      <div className="puzzle-container" ref={containerRef}>
        {/* Letter Grid */}
        <div className="grid" onMouseLeave={() => { if (mouseDown) onCellMouseUp(); }}>
          {grid.map((row, rIndex) => (
            <div key={rIndex} className="row">
              {row.map((letter, cIndex) => {
                const id = idOf(rIndex, cIndex);
                const selected = cellIsSelected(rIndex, cIndex);
                const found = cellIsPartOfFoundWord(rIndex, cIndex);
                const classes = [
                  "cell",
                  selected ? "selected" : "",
                  found ? "found" : "",
                ].join(" ");
                return (
                  <div
                    key={cIndex}
                    className={classes}
                    onMouseDown={() => onCellMouseDown(rIndex, cIndex)}
                    onMouseEnter={() => onCellMouseEnter(rIndex, cIndex)}
                    onMouseUp={() => onCellMouseUp()}
                    onClick={() => onCellClick(rIndex, cIndex)}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Word List */}
        <div className="word-list">
          <h3>Find these words:</h3>
          {placedWords.map((pw, i) => (
            <div key={i} className={`word-item ${pw.found ? "word-found" : ""}`}>
              {pw.word}
            </div>
          ))}
          <button className="shuffle-btn" onClick={generatePuzzle}>
            New Puzzle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assignment_32;
