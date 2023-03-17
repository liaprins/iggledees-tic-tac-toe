import * as React from "react"; // import everything
import Square from "./Square.js"; // import Square component
import calculateWinner from "./helper.js"; // import calculateWinner function

export default function Row({squares, handleClick, rowIndex, gridDimensions}) {
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