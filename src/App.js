import React from "react"
import Confetti from "react-confetti"
import Die from "./Die"
import "./style.css";

export default function App() {
  // create a state that holds the randomized array of dice
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)

  // useEffect to keep 2 states in sync
    React.useEffect(() => {
      // need a reference number to compare all the other numbers to in the array
        const firstValue = dice[0].value
      // check if the dice are all held
        const allHeld = dice.every(die => die.held)
      // check if the dice have the same value
      // .every => true only if all have the same value
        const allSameNumber = dice.every(die => die.value === firstValue)
        if(allHeld && allSameNumber) {
            setTenzies(true)
        }
    }, [dice])

    // create a random value for a die
    function randomDieValue() {
        return Math.ceil(Math.random() * 6)
    }

    // return an array with random numbers between 1 and 6
    function allNewDice() {
      // create an empty array
        const newArray = []
        // loop 10 times
        for(let i = 0; i < 10; i++) {
          // create a die with a random number
            const newDie = {
              //create random value
                value: randomDieValue(),
              // set a held key set on false => true to be held
                held: false,
              // create an id (increment) => use as a key and to check if die is held
                id: i + 1
            }
            // push my new die in the empty array
            newArray.push(newDie)
        }
        // don't forget to return the newly made array
        return newArray
    }

    // Create a button to roll the dice (create 10 new dice)
    function rollUnheldDice() {
      // re-roll only the unclicked dice
      // if they have not won (tenzies = false )
        if (!tenzies) {
            setDice((oldDice) => oldDice.map((die, i) =>
              // if die held is true
              die.held ?
                  //keep it in array
                    die :
                  // create a new die
                    { value: randomDieValue(), held: false, id: i + 1 }
            ))
        } else {
          // setDice return an updated array of randomized dice when button Roll clicked
            setDice(allNewDice())
          // restart game
            setTenzies(false)
        }
        setCount(count => count + 1)
    }

    // freeze numbers that we don't want to be re-rolled
    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
          // verify if the die's id
            return die.id === id ?
            //if die clicked set held on true else return die held set on false
                {...die, held: !die.held} :
                die
        }))
    }

    // map over the array to show each random die
    const diceElements = dice.map((die) => (
      // assign a key to each die
        <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">{diceElements}</div>
            <button className="roll-dice" onClick={rollUnheldDice}>
                {tenzies ? "Reset Game" : "Roll"}
            </button>
            <p>You played {count} {count < 2 ? "time" : "times"}</p>
        </main>
    )
}
