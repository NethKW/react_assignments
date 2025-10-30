import React, { useEffect, useState } from 'react';
import './Assignment_27.css';
import foodImg from '../assets/greenApple.png';

const rows = 12;
const cols = 12;

const mat = Array(rows)
  .fill()
  .map(() =>
    Array(cols).fill(0));

function Assignment_27() {
  const [snake, setSnake] = useState([
    { x: 4, y: 4 },
    { x: 4, y: 3 },
    { x: 4, y: 2 },
  ]);

  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState({ x: 6, y: 6 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if ((key === "arrowup" || key === 'w') && direction !== "DOWN") setDirection("UP");
      else if ((key === "arrowdown" || key === 's') && direction !== "UP") setDirection("DOWN");
      else if ((key === "arrowleft" || key === 'a') && direction !== "RIGHT") setDirection("LEFT");
      else if ((key === "arrowright" || key === 'd') && direction !== "LEFT") setDirection("RIGHT");
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

      if (newSnake.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        return;
      }

      let foodEat = head.x === food.x && head.y === food.y;
      if (foodEat) {
        newSnake.unshift(head);
        generateFood(newSnake);
      }
      else {
        newSnake.unshift(head);
        newSnake.pop();
      }
      setSnake(newSnake);
    };
    const interval = setInterval(() => {
      moveSnake();
    }, 200);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  const generateFood = (currentSnake) => {
    let x, y;
    do {
      x = Math.floor(Math.random() * rows);
      y = Math.floor(Math.random() * cols);
    } while (currentSnake.some((s) => s.x === x && s.y === y));
    setFood({ x, y });
  }

  const isSnakeCell = (x, y) => snake.some((s) => s.x === x && s.y === y);
  const isFoodCell = (x, y) => food.x === x && food.y === y;

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
                const foodHere = isFoodCell(rIndex, cIndex);
                return (
                  <div key={cIndex} className={`cell  ${snakeHere ? 'snake' : ''}`}>
                    {foodHere && <img src={foodImg} className='food-img' />}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      {gameOver && (
        <h2>Game Over!</h2>
      )}

    </div>
  )
}

export default Assignment_27
