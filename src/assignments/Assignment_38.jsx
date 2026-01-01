import React, { useState } from "react";
import "./Assignment_38.css";

const bottleFill = [
  ["green", "red", "blue"],
  ["blue", "purple", "brown"],
  ["orange", "brown", "green"],
  ["brown", "purple", "blue"],
  ["red", "orange", "brown"],
  ["purple", "green", "red"],
  ["purple", "orange", "blue"],
  ["green", "red", "orange"]
]

//bottle complete
const isBottleCompleted = (bottle) => {
  return (
    bottle.length === 4 &&
    bottle.every(color => color === bottle[0])
  );
};
//game complete
const isGameCompleted = (bottles) => {
  return bottles.every(
    (b) =>
      b.length === 0 || (b.length === 4 && b.every((color) => color === b[0]))
  );
};

export default function Assignment_38() {
  const [bottle, setBottle] = useState(bottleFill); //game start display the bottleFill array color
  const [bottleSelect, setBottleSelect] = useState(null);
  const [completed, setCompleted] = useState(false);

  const bottleClick = (i) => {
    if (completed) return;

    if (isBottleCompleted(bottle[i])) return;

    if (bottleSelect === null) {
      setBottleSelect(i);
      return;
    }
    if (bottleSelect === i) {
      setBottleSelect(null);
      return;
    }
    waterFill(bottleSelect, i);
    setBottleSelect(null);
  }

  const restartGame = () => {
    setBottle(bottleFill);
    setBottleSelect(null);
    setCompleted(false);
  };

  //water filling according to same color 
  const waterFill = (source, target) => {
    const newBottleFill = bottle.map(b => [...b]);
    const source1 = newBottleFill[source];
    const target1 = newBottleFill[target];

    console.log("BEFORE");
    console.log("Source:", source1);
    console.log("Target:", target1);

    if (source1.length === 0) return;
    if (target1.length === 4) return;

    const sourceTop = source1[source1.length - 1];
    const targetTop = target1[target1.length - 1];

    //check whether same color next to each other
    if (target1.length === 0 || sourceTop === targetTop) {
      let count = 1;
      for (let i = source1.length - 2; i >= 0; i--) {
        if (source1[i] === sourceTop) count++;
        else break;
      }

      const space = 4 - target1.length;
      const move = Math.min(count, space);

      for (let i = 0; i < move; i++) {
        target1.push(source1.pop());
      }

      setBottle(newBottleFill);

      if (isGameCompleted(newBottleFill)) {
        setCompleted(true);
      }
    }
  };
  return (
    <div className="main asg-38">
      <h2>Water Sort Puzzle</h2>

      <div className="puzzle">
        <div className="bottles">
          {bottle.map((bottle, i) => {
            const completedBottle = isBottleCompleted(bottle);
            return (
              <div
                key={i}
                className="bottle"
                data-complete={completedBottle}
                data-hold={bottleSelect === i}
                onClick={() => bottleClick(i)}>
                {completedBottle && <p className="done1">DONE</p>}
                {bottle.map((color, index) => (
                  <div
                    key={index}
                    className="water"
                    data-color={color}
                    data-size={bottle.length}
                  ></div>
                ))}
              </div>
            );
          })}
        </div>
        {completed && (
          <div className="congrats-popup">
            <h2>Congratulations!</h2>
            <button onClick={restartGame}>Restart Game</button>
          </div>
        )}
      </div>
    </div>
  );
}
