import Dice from "./Dice.jsx";
import React from "react";
import Confetti from "react-confetti";
export default function App() {
  const [numbers, setNumbers] = React.useState(generateNumbers());

  let gameWon =
    numbers.every((die) => die.isHeld) &&
    numbers.every((die) => die.number === numbers[0].number);

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
  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dices">{mappedNumbers}</div>
      <button id="rollButton" onClick={rollDice}>
        {gameWon ? (
          <>
            New Game
            <Confetti />
          </>
        ) : (
          "Roll"
        )}
      </button>
    </main>
  );
}
