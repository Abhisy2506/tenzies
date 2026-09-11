import DiceElememnts from "./DiceElements";
import { useState, useRef, useEffect } from "react";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';


export default function App() {

  const buttonRef = useRef(null)

  function generateNewDice() {
    const newDice = [];
    for (let i = 1; i <= 10; ++i) {
      let num = /*Math.floor(Math.random() * 6) + 1*/5;
      newDice.push({ id: i, value: num, isHeld: false });
    }
    return newDice;
  }

  const [diceElements, setDiceElements] = useState(generateNewDice());


  const allHeld = diceElements.every((die) => die.isHeld);
  const firstValue = diceElements[0].value;
  const allSameValue = diceElements.every((die) => die.value === firstValue);

  const gameWon = allHeld && allSameValue;

  useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus()
    }
  }, [gameWon])

  function onRoll() {
    if (!gameWon) {
      setDiceElements((prevDice) =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6) + 1 }
        )
      );
    } else {
      setDiceElements(generateNewDice());
    }
  }

  function onStopDiceRoll(id) {
    setDiceElements((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const displayDice = diceElements.map((obj) => (
    <DiceElememnts
      key={obj.id}
      id={obj.id}
      isHeld={obj.isHeld}
      displayNumber={obj.value}
      stopRolling={onStopDiceRoll}
    />
  ));

  return (
    <div className="main">
      {gameWon && (
        <>
        <Confetti
          recycle={false}
          numberOfPieces={500}
        />
        <div className="win-message">
          <h2>Congratulations! You Win</h2>
        </div>
      </>
      )}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>

      <div className="dice-value-grid">{displayDice}</div>

      <button ref={buttonRef} className="roll-dice" onClick={onRoll}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </div>
  );
}