import React from "react";
import "./Assignment_38.css";

export default function Assignment_38() {

    return (
        <div className="main asg-38">
            <h2>Water Sort Puzzle</h2>

            <div className="puzzle">
                <div className="bottles">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div className="bottle" key={i}>
                            <div className="water red"></div>
                            <div className="water blue"></div>
                            <div className="water green"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
