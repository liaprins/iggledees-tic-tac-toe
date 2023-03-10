import * as React from "react"; // import everything
import { useState } from "react"; // name these imports
import Board from "./Board.js";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [defaultSort, setDefaultSort] = useState(true);
  const currentSquares = history[currentMove];
  const playerOneNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // build buttons tracking each move
  const moves = history.map((squares, move) => {
    let description;
    if (move === currentMove) {
      description = "You are at move #" + move;
      return (
        <li key={move}>
          <span className="move-text">{description}</span>
        </li>
      );
    } else {
      if (move === 0) {
        description = "Go to game start";
      } else {
        description = "Go to move #" + move;
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  // allow user to reverse the sort-order of the moves-list
  let displayMoves;
  defaultSort ? displayMoves = [...moves] : displayMoves = [...moves].reverse();
  function reverseSort() {  
    setDefaultSort(!defaultSort);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board playerOneNext={playerOneNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} /> 
      </div>
      <div className="game-info">
        <button onClick={reverseSort} >Reverse the sort-order:</button>
        <ul>{displayMoves}</ul>
      </div>
    </div>
  );
}
