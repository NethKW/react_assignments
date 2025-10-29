import React, { useState } from "react";
import data from "../scripts/flip-and-match.json";
import "./Assignment_26.css";
import gameIcon from "../assets/game.gif";

function Assignment_26() {
  const [selectedSet, setSelectedSet] = useState(null);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); 
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState(false);

  const handleSelectSet = (set) => {
    setSelectedSet(set.label);
    const duplicated = [...set.items, ...set.items];

    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ id: index, symbol: item }));

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
  };

  const handleFlip = (index) => {
    if (lock) return;
    if (flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLock(true);
      const [first, second] = newFlipped;

      if (cards[first].symbol === cards[second].symbol) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        setLock(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 700);
      }
    }
  };

  return (
    <div className="main asg-26">
       <img src={gameIcon} alt="icon" className="game-icon" />
      <h1>Flip and Match Game</h1>

      {!selectedSet && (
        <div className="set-selector">
          <h2>Select a Puzzle Collection</h2>
          {data.map((set) => (
            <button
              key={set.label} 
              onClick={() => handleSelectSet(set)}
              className="set-btn"
            >
              {set.label}
            </button>
          ))}
        </div>
      )}

      {selectedSet && (
        <>
          <h3>Selected Collection: {selectedSet}</h3>

          <div className="grid">
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              return (
                <div
                  key={card.id}
                  className={`card ${isFlipped ? "flipped" : ""}`}
                  onClick={() => handleFlip(index)}
                >
                  <div className="inner">
                    <div className="front"></div>
                    <div className="back">{card.symbol}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {matched.length === cards.length && (
            <div className="win">
               You Matched All! 
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Assignment_26;
