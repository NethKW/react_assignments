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

const cars = [sprites[1], sprites[2], sprites[3], sprites[4], sprites[5]]

export default function AssignmentW_08() {

  const roadScrolling = useRef(0)
  const [counter, setCounter] = useState(0)

  const createCarPosition = () => {
    let carPosition = []
    let startY = -200
    for (let i = 0; i < cars.length; i++) {
      // Random lane and random gap
      const lane = roadLanes[Math.floor(Math.random() * roadLanes.length)]
      const gap = 400 + Math.random() * 150
      carPosition.push({ sprite: cars[i], x: lane, y: startY })
      startY -= gap
    }
    return carPosition
  }

  const carPositionRef = useRef(createCarPosition())

  useEffect(() => {
    let frame = null
    let previousTime = performance.now()

    const update = (time) => {
      frame = requestAnimationFrame(update)
      const delta = time - previousTime //get delta time

      roadScrolling.current += 0.3 * delta //update scrolling value
      previousTime = time

      carPositionRef.current = carPositionRef.current.map((enemy) => {
        let newY = enemy.y + 0.3 * delta
        let newX = enemy.x

        if (newY > gameScreen) {
          newX = roadLanes[Math.floor(Math.random() * roadLanes.length)]
          newY = -(400 + Math.random() * 150)
        }

        return { ...enemy, y: newY, x: newX }
      })


      setCounter(value => value + 1)
    }
    frame = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [])
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
            left: "140px",
            bottom: "40px"
          }}
        />

        {carPositionRef.current.map((enemy, i) => (
          <Vehicle
            key={i}
            sprite={enemy.sprite}
            style={{ left: `${enemy.x}px`, top: `${enemy.y}px` }}
          />
        ))}

        <div className="score">Score</div>
      </div>
    </div>
  )
}

