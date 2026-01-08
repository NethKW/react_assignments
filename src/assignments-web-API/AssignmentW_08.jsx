import React, { useEffect, useRef, useState } from "react"
import "./AssignmentW_08.css"
import sprites from "../scripts/highway-rush.json"

// eslint-disable-next-line react-refresh/only-export-components
function Vehicle({ sprite, style }) {
  return (
    <div
      className="vehicle"
      style={{
        width: sprite.width,
        height: sprite.height,
        backgroundPosition: `-${sprite.x}px -${sprite.y}px`,
        ...style
      }}
    />
  )
}

const gameScreen = 500
const roadLanes = [55, 120, 185, 250]
const playerWidth = 56
const playerHeight = 96

const cars = [sprites[0], sprites[1], sprites[2], sprites[3], sprites[4], sprites[5], sprites[6], sprites[7]]

const isColliding = (playerX, playerY, playerW, playerH, enemyX, enemyY, enemyW, enemyH) => {
  return !(
    playerX + playerW < enemyX ||
    playerX > enemyX + enemyW ||
    playerY + playerH < enemyY ||
    playerY > enemyY + enemyH
  );
};


export default function AssignmentW_08() {

  const roadScrolling = useRef(0)
  const [counter, setCounter] = useState(0)
  const [carsOnRoad, setCarsOnRoad] = useState([])
  const [gameState, setGameState] = useState("start")
  const previousCarTime = useRef(0)
  const move = useRef(0)
  const player = useRef(150)
  const gameStateRef = useRef("start")

  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])

  useEffect(() => {
    let frame = null
    let previousTime = performance.now()

    const update = (time) => {
      frame = requestAnimationFrame(update)
      const delta = time - previousTime //get delta time

      roadScrolling.current += 0.3 * delta //update scrolling value
      previousTime = time

      player.current += move.current * 0.25 * delta
      player.current = Math.max(55, Math.min(250, player.current))

      setCounter(value => value + 1)

      if (gameStateRef.current === "playing") {
        setCarsOnRoad((prevCars) =>
          prevCars
            .map((car) => ({ ...car, y: car.y + 0.2 * delta }))
            .filter((car) => {
              const playerX = player.current;
              const playerY = gameScreen - 35 - playerHeight;
              const playerW = playerWidth;
              const playerH = playerHeight;

              const enemyX = car.x;
              const enemyY = car.y;
              const enemyW = car.sprite.width;
              const enemyH = car.sprite.height;

              if (isColliding(playerX, playerY, playerW, playerH, enemyX, enemyY, enemyW, enemyH)) {
                setGameState("gameOver");
              }
              return car.y < 500 + 100;
            })
        );

        if (time - previousCarTime.current > 1200) {
          const lane = roadLanes[Math.floor(Math.random() * roadLanes.length)];
          const sprite = cars[Math.floor(Math.random() * cars.length)];
          setCarsOnRoad((prev) => [...prev, { sprite, x: lane, y: -150 }]);
          previousCarTime.current = time;
        }
      }
    }
    frame = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const down = (e) => {
      if (e.key === "ArrowLeft") move.current = -1
      if (e.key === "ArrowRight") move.current = 1
    }

    const up = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        move.current = 0
      }
    }

    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)

    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [])

  const startGame = () => {
    roadScrolling.current = 0
    player.current = 140
    move.current = 0
    setCarsOnRoad([])
    previousCarTime.current = 0
    setCounter(0)
    setGameState("playing")
  }

  return (
    <div className="game asgW-08">
      <div className="game-section" data-counter={counter}>

        <div className="road"
          style={{
            backgroundPositionY: `${roadScrolling.current}px`
          }} />

        <Vehicle
          sprite={sprites[4]}
          style={{
            left: `${player.current}px`,
            bottom: "40px",
          }}
        />

        {carsOnRoad.map((enemy, i) => (
          <Vehicle
            key={i}
            sprite={enemy.sprite}
            style={{ left: `${enemy.x}px`, top: `${enemy.y}px` }}
          />
        ))}

        {gameState === "playing" && (
          <div className="score">Score:</div>
        )}

        {gameState === "start" && (
          <div className="overlay">
            <h1>Highway Rush</h1>
            <button onClick={startGame}>Start</button>
          </div>
        )}

        {gameState === "gameOver" && (
          <div className="overlay">
            <h1>Game Over</h1>
            <h3>Score:</h3>
            <button onClick={startGame}>Restart</button>
          </div>
        )}
      </div>
    </div>
  )
}

