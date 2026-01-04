import React from "react"
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
   return (
    <div className="game asgW-08">
      <div className="game-section">

        <div className="road"/>

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

