import React, { useState, useEffect, useRef } from "react";
import "./Assignment_33.css";
import knife from "../assets/knife.png";

function Assignment_33() {
  const [score, setScore] = useState(0);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(null);
  const [flying, setFlying] = useState(false);
  const [flyingKnife, setFlyingKnife] = useState(350);
  const [knives, setKnives] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const animRef = useRef(null);

  useEffect(() => {
    if (isGameOver) return;
    rotationRef.current = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(rotationRef.current);
  }, [isGameOver]);

  const throwKnife = () => {
    if (flying || isGameOver) return;
    setFlying(true);
    setFlyingKnife(650);
  };

  useEffect(() => {
    if (!flying) return;
    let y = 430;
    const step = () => {
      y -= 12;
      setFlyingKnife(y);
      if (y <= 430) {
        const hitAngle = computeHitAngle();
        console.log("Knife hit angle:", hitAngle);
        if (checkHit(hitAngle)) {
          setIsGameOver(true);
          setFlying(false);
          return;
        }
        setKnives(prev => [...prev, hitAngle]);
        setScore(s => s + 1);
        setFlying(false);
        setFlyingKnife(350);
        return;
      }

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flying]);

  const computeHitAngle = () => {
    const offset = 90;
    const hitAngle = (360 - rotation + offset) % 360;
    return hitAngle;
  };

  const checkHit = (hitAngle) => {
    const COLLISION_ANGLE = 15;
    return knives.some(
      (k) => Math.abs(((k - hitAngle + 180 + 360) % 360) - 180) < COLLISION_ANGLE
    );
  };

  const restartGame = () => {
    setKnives([]);
    setScore(0);
    setIsGameOver(false);
    setFlying(false);
    setFlyingKnife(350);
    setRotation(0);
  };

  return (
    <div className="asg-33 main">
      <h1>Blade-Hit Game</h1>
      <div className="score">Score: {score}</div>
      <div className="knife-game" onClick={throwKnife}>
        <div className="target-base" style={{ transform: `rotate(${rotation}deg)` }}>
          {knives.map((angle, i) => {
            const center = 100;
            const radius = 90;
            const rad = angle * Math.PI / 180;

            const knifeW = 40;
            const knifeH = 100;

            const x = center + radius * Math.cos(rad) - knifeW / 2;
            const y = center + radius * Math.sin(rad) - knifeH / 2;

            return (
              <div
                key={i}
                className="knife knife-stuck"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `rotate(${angle + 270}deg)`,
                  backgroundImage: `url(${knife})`,
                  position: "absolute",
                }}
              />
            );
          })}

          <div className="target" style={{ transform: `rotate(${rotation}deg)` }} />

        </div>

        {flying ? (
          <div
            className="knife-flying"
            style={{
              top: `${flyingKnife}px`,
              backgroundImage: `url(${knife})`,
            }}
          />
        ) : (
          <div
            className="knife-bottom"
            style={{ backgroundImage: `url(${knife})` }}
          />
        )}
        {isGameOver && (
          <div className="gameOver">
            <h2>Game Over</h2>
            <p>Final Score: {score}</p>
            <button onClick={restartGame}>Restart</button>
          </div>
        )}

      </div>
    </div>
  );
}
export default Assignment_33;