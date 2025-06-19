import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useRef } from "react";
import { useEffect } from "react";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  let gameWon = false;
  if (
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value)
  ) {
    gameWon = true;
  }

  useEffect(() => {
    buttonRef.current.focus();
  }, [gameWon]);

  function generateAllNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }

    console.log(newDice);

    return newDice;

    // return new Array(10)
    //         .fill(0)
    //         .map(() => Math.ceil(Math.random() * 6))
  }

  function rollDice() {
    if (!gameWon) {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      id={dieObj.id}
      isHeld={dieObj.isHeld}
      value={dieObj.value}
      hold={() => hold(dieObj.id)}
    />
  ));

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
