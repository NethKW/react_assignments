import React, { useEffect, useState } from "react";
import "./Assignment_34.css";

const getCoords = (n, radius, rotation) => {
  const coords = [];
  const angleStep = (2 * Math.PI) / n;
  const rotRad = (rotation * Math.PI) / 180;

  for (let i = 0; i < n; i++) {
    const angle = i * angleStep + rotRad;
    const y = radius * Math.sin(angle);
    const z = radius * Math.cos(angle);
    const scale = 1 - Math.abs(y) / radius;

    coords.push({ y, z, scale });
  }
  return coords;
};

// eslint-disable-next-line react-refresh/only-export-components
const DrumColumn = ({ digit }) => {
  const radius = 100;
  const [rotation, setRotation] = useState(digit * -36);

  useEffect(() => {
    setRotation(digit * -36);
  }, [digit]);

  const coords = getCoords(10, radius, rotation);

  return (
    <div className="clock-column">
      {coords.map((c, i) => {
        const opacity = c.z > 0 && c.scale > 0.2 ? 1 : 0;
        const zIndex = Math.floor(c.z) + 10;
        return (
          <div
            key={i}
            className="column-item"
            style={{
              transform: `translateY(${c.y}px) scale(${c.scale})`,
              opacity: opacity,
              zIndex: zIndex,
            }}
          >
            {i}
          </div>
        )

      })}
    </div>
  );
};

export default function Assignment_34() {
  const [t, setT] = useState(new Date());

  useEffect(() => {
    const x = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(x);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const hh = pad(t.getHours());
  const mm = pad(t.getMinutes());
  const ss = pad(t.getSeconds());

  return (
    <div className="main asg-34">
      <div className="clock">
        <DrumColumn digit={Number(hh[0])} />
        <DrumColumn digit={Number(hh[1])} />
        <span className="colon">:</span>
        <DrumColumn digit={Number(mm[0])} />
        <DrumColumn digit={Number(mm[1])} />
        <span className="colon">:</span>
        <DrumColumn digit={Number(ss[0])} />
        <DrumColumn digit={Number(ss[1])} />
      </div>
    </div>
  );
}
