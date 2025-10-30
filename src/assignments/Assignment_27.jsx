import React, { useEffect, useState } from 'react';
import './Assignment_27.css';

const rows = 12;
const cols = 12;

const mat = Array(rows)
  .fill()
  .map(() =>
    Array(cols).fill(0));


function Sample() {
  const [snake, setSnake] = useState([
    { x: 4, y: 4 },
    { x: 4, y: 3 },
    { x: 4, y: 2 },
  ]);

  const [direction, setDirection] = useState("RIGHT");

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if ((key === "ArrowUp" || key==='w') && direction !== "DOWN") setDirection("UP");
      else if ((key === "ArrowDown" || key==='s') && direction !== "UP") setDirection("DOWN");
      else if ((key === "ArrowLeft" || key==='a') && direction !== "RIGHT") setDirection("LEFT");
      else if ((key === "ArrowRight" || key==='d') && direction !== "LEFT") setDirection("RIGHT");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      if (direction === "UP") head.x = (head.x - 1 + rows) % rows;
      if (direction === "DOWN") head.x = (head.x + 1) % rows;
      if (direction === "LEFT") head.y = (head.y - 1 + cols) % cols;
      if (direction === "RIGHT") head.y = (head.y + 1) % cols;

      newSnake.unshift(head);
      newSnake.pop();
      setSnake(newSnake);
    };
    const interval = setInterval(() => {
      moveSnake();
    }, 200);

    return () => clearInterval(interval);
  }, [snake, direction]);



  const isSnakeCell = (x, y) => snake.some((s) => s.x === x && s.y === y);

  return (
    <div className='asg-27 main'>
      <h1>Snake Game</h1>
      <p>Use Arrow Keys or W, A, S, D to move</p>
      <div className='main-grid'>
        <div className='grid'>
          {mat.map((row, rIndex) => (
            <div key={rIndex} className='row'>
              {row.map((cell, cIndex) => {
                const snakeHere = isSnakeCell(rIndex, cIndex);
                return (
                  <div key={cIndex} className={`cell  ${snakeHere ? 'snake' : ''}`}></div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sample
