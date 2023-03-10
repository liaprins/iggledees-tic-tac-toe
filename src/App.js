import * as React from "react"; // import everything
import { useState } from "react"; // name these imports
import Board from "./Board.js";
import { calculateColRow } from "./helper.js";

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

  // list tracking each move
  const moves = history.map((squares, move) => {
    
    let descriptionEnd;
    if (move === 0) {
      descriptionEnd = "game start";
    } else {
      descriptionEnd = `move #${move} ${calculateColRow(move, history[move], history[move - 1])}`;
    }

    let listItem;
    if (move === currentMove) {
      listItem = <span className="move-text">{"You are at " + descriptionEnd}</span>;
    } else {
      listItem = <button onClick={() => jumpTo(move)}>{"Go to " + descriptionEnd}</button>;
    }
    return (
      <li key={move}>{listItem}</li>
    );
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
