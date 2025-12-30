import React, { useState } from "react";
import "./Assignment_38.css";

const bottleFill = [
    ["blue", "red", "green"],
    ["brown", "purple", "blue"],
    ["green", "brown", "orange"],
    ["blue", "purple", "brown"],
    ["brown", "orange", "red"],
    ["red", "green", "purple"],
    ["blue", "orange", "purple"],
    ["orange", "red", "green"]
]

export default function Assignment_38() {
    const [bottleSelect,setBottleSelect] = useState(null);
    const bottleClick = (i) => {
        if (bottleSelect ===i) {
            setBottleSelect(null)
        } else {
            setBottleSelect(i);
        }
    }
    return (
        <div className="main asg-38">
            <h2>Water Sort Puzzle</h2>

            <div className="puzzle">
                <div className="bottles">
                    {bottleFill.map((bottle, i) => (
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
