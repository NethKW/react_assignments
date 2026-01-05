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

export default function AssignmentW_08() {

  const roadScrolling = useRef(0)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let frame = null
    let previousTime = performance.now()

    const update = (time) => {
      frame = requestAnimationFrame(update)
      const delta = time - previousTime //get delta time

      roadScrolling.current += 0.3 * delta //update scrolling value
      previousTime = time
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

        <Vehicle
          sprite={sprites[1]}
          style={{
            left: "160px",
            top: "120px"
          }}
        />

        <div className="score">Score</div>
      </div>
    </div>
  )
}

