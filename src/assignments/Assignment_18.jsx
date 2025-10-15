import React, { useState, useEffect } from "react";
import "./Assignment_18.css";
import scoreIcon from '../assets/score.png'
import colorIcon from '../assets/color.png';
import gameOverIcon from '../assets/game_over.png';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(() => ({
  backgroundColor: 'red',
  '&:hover': {
    backgroundColor: '#c90b0bff',
  },
}));

const ColorButton1 = styled(Button)(() => ({
  backgroundColor: 'blue',
  '&:hover': {
    backgroundColor: '#07338bff',
  },
}));

// eslint-disable-next-line react-refresh/only-export-components
function StartScreen({ onStart }) {
  return (
    <div className="color-input">
      <h2>Color Clicking Puzzle Game</h2>
      <img src={colorIcon} alt="colorIcon" className="color-img" />
      <h4>Click “Start” to begin the challenge!</h4>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={onStart}>Start</Button>
      </Stack>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function GameScreen({ onGameOver }) {
  const [colorArr, setColorArr] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);


  const newColorAdd = () => {
    const newColor = Math.random() < 0.5 ? "blue" : "red";
    setColorArr((previousColor) => {
      const updatedColor = [newColor, ...previousColor];
      if (updatedColor.length > 5) {
        setGameOver(true);
        return previousColor;
      }
      return updatedColor;
    });
  }


  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      newColorAdd()
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const handleClick = (color) => {
    if (gameOver || colorArr.length === 0) return;

    const lastColor = colorArr[colorArr.length - 1];
    if (lastColor === color) {
      setColorArr((prev) => prev.slice(0, -1));
      setScore((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setColorArr([]);
    setScore(0);
    setGameOver(false);
  };


  useEffect(() => {
    if (gameOver) onGameOver();
  }, [gameOver, onGameOver]);

  return (
    <div className="game">
      <div className="score-header">
        <img src={scoreIcon} alt="Score Icon" className="score-icon" />
        <h2>Score: {score}</h2>
      </div>


      {gameOver ? (
        <div className="color-input">
          <div><img className="game-over" src={gameOverIcon} alt="gameOverIcon" />
            <h3> Game Over!</h3></div>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={restartGame}>Restart</Button>
          </Stack>
        </div>
      ) : (
        <>
          <div className="color">
            {colorArr.map((c, i) => (
              <div key={i} className={`mixed-color ${c}`}></div>
            ))}
          </div>

          <div className="color-input color-select">
            <Stack direction="row" spacing={2}>
              <ColorButton1 variant="contained" onClick={() => handleClick("blue")}>Blue</ColorButton1>
            </Stack>

            <Stack direction="row" spacing={2}>
              <ColorButton variant="contained" onClick={() => handleClick("red")}>Red</ColorButton>
            </Stack>

          </div>
        </>
      )}
    </div>
  );
}


function Assignment_18() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => setGameStarted(true);
  const handleGameOver = () => console.log("Game Over!");

  return (
    <main className="main asg-18">
      {!gameStarted ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameScreen onGameOver={handleGameOver} />
      )}
    </main>
  );
}

export default Assignment_18;
