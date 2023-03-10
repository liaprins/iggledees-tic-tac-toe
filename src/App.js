import * as React from "react"; // import everything
import { Fragment, useState } from "react"; // name these imports

function Square({ value, onSquareClick, className }) {
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Row({squares, handleClick, rowIndex, gridDimensions}) {
  return (
    <div className="board-row">{
      [...Array(gridDimensions)].map((squareEl, index) => {
        const squareIndex = (rowIndex * gridDimensions) + index;

        // highlight winning squares
        let squareClasses;
        if (calculateWinner(squares)) {
          if (squareIndex === calculateWinner(squares).winningSquares[0] || 
              squareIndex === calculateWinner(squares).winningSquares[1] || 
              squareIndex === calculateWinner(squares).winningSquares[2]) {
            squareClasses = "square highlight";
          } else {
            squareClasses = "square";
          }
        } else {
          squareClasses = "square";
        }

        return (
          <Square value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} key={squareIndex} className={squareClasses} />
        ); // close inner return
      }) // close .map
    }</div>
  ); // close outer return
} // close Row

function Board({ playerOneNext, squares, onPlay, currentMove }) {
  
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return squares[a];
      return (
        {
          winner: squares[a],
          winningSquares: lines[i]
        }
      );
    }
  }
  return null;
}
