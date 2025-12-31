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

export default function Assignment_38() {
  const [bottle, setBottle] = useState(bottleFill); //game start display the bottleFill array color
  const [bottleSelect, setBottleSelect] = useState(null);

  const bottleClick = (i) => {

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

    if (target1.length === 0 || sourceTop === targetTop) {
      target1.push(source1.pop());
      setBottle(newBottleFill);
    }

    console.log("AFTER");
    console.log("Source:", source1);
    console.log("Target:", target1);
  }
  return (
    <div className="main asg-38">
      <h2>Water Sort Puzzle</h2>

      <div className="puzzle">
        <div className="bottles">
          {bottle.map((bottle, i) => (
            <div className={`bottle ${bottleSelect === i ? "selected" : ""}`} key={i} onClick={() => bottleClick(i)}>
              {bottle.map((color, index) => (
                <div
                  key={index}
                  className={`water ${color}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
