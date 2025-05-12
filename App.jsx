import Dice from "./Dice.jsx";
import React, { useEffect, useRef } from "react";
import Confetti from "react-confetti";
export default function App() {
  const [numbers, setNumbers] = React.useState(() => generateNumbers());
  const [counter, setCounter] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);

  let gameWon =
    numbers.every((die) => die.isHeld) &&
    numbers.every((die) => die.number === numbers[0].number);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
      setIsRunning(false);
    }
  }, [gameWon]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  function holdButton(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function generateNumbers() {
    let generatedNumbers = [];
    for (let i = 0; i < 10; i++) {
      generatedNumbers.push({
        id: i,
        number: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
      });
    }
    console.log(generatedNumbers);
    return generatedNumbers;
  }

  const mappedNumbers = numbers.map((die) => (
    <Dice
      key={die.id}
      id={die.id}
      number={die.number}
      isHeld={die.isHeld}
      holdButton={holdButton}
    />
  ));

  function rollDice() {
    if (!isRunning) setIsRunning(true);
    setCounter((prevCounter) => prevCounter + 1);
    setNumbers((prevNumbers) =>
      prevNumbers.map((die) =>
        die.isHeld
          ? die
          : {
              ...die,
              number: Math.floor(Math.random() * 6 + 1),
            }
      )
    );
  }

  function newGame() {
    setNumbers((prevNumbers) => generateNumbers());
    setCounter((prevCounter) => 0);
    setTimer(0);
    setIsRunning(true);
  }
  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dices">{mappedNumbers}</div>
      <button
        id="rollButton"
        ref={buttonRef}
        onClick={gameWon ? newGame : rollDice}
      >
        {gameWon ? (
          <>
            New Game
            <Confetti />
          </>
        ) : (
          "Roll"
        )}
      </button>
      <div id="infoBar">
        <p>Rolls: {counter}</p>
        <button onClick={newGame}>Reset</button>
        <p>{timer}(s)</p>
      </div>
    </main>
  );
}
