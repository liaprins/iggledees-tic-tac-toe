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
  const moves = history.map((_, move) => {
    const descriptionEnd =
      move === 0
        ? "game start"
        : `move #${move} ${calculateColRow(
            move,
            history[move],
            history[move - 1]
          )}`;

    const listItem =
      move === currentMove ? (
        <span className="move-text">{"You are at " + descriptionEnd}</span>
      ) : (
        <button onClick={() => jumpTo(move)}>
          {"Go to " + descriptionEnd}
        </button>
      );

    return <li key={move}>{listItem}</li>;
  });

  // allow user to reverse the sort-order of the moves-list
  const displayMoves = defaultSort ? moves : moves.reverse();

  function handleClick() {
    setDefaultSort((defaultSort) => !defaultSort);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          playerOneNext={playerOneNext}
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove}
        />
      </div>
      <div className="game-info">
        <button onClick={handleClick}>Reverse the sort-order:</button>
        <ul>{displayMoves}</ul>
      </div>
    </div>
  );
}
