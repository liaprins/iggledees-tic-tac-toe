import * as React from "react"; // import everything
import { Fragment } from "react"; // name these imports
import Row from "./Row.js"; // import Row component
import { calculateWinner } from "./helper.js"; // import calculateWinner function

export default function Board({ playerOneNext, squares, onPlay, currentMove }) {
  
    const playerOne = "😊";
    const playerTwo = "💩";
    const gridDimensions = 3;
  
    function handleClick(i) {
      if (squares[i] || calculateWinner(squares)) {
        return;
      }
  
      const nextSquares = squares.slice();
  
      if (playerOneNext) {
        nextSquares[i] = playerOne;
      } else {
        nextSquares[i] = playerTwo;
      }
  
      onPlay(nextSquares);
    }
  
    let winner;
    calculateWinner(squares) && (winner = calculateWinner(squares).winner);
    
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (currentMove === 9) {
      status = "Cat's game 😸"
    } else {
      status = "Next player: " + (playerOneNext ? playerOne : playerTwo);
    }
  
    return (
      <Fragment>
        <div className="status">{status}</div>
        {
          [...Array(gridDimensions)].map((rowEl, rowIndex) => {
            return <Row squares={squares} handleClick={handleClick} rowIndex={rowIndex} key={rowIndex} gridDimensions={gridDimensions} />;
          }) // close .map
        }
      </Fragment>
    );
  } // close Board