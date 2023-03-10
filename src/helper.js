export function calculateWinner(squares) {
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

export function calculateColRow(move, historyMoveCurrent, historyMovePrevious) {
  // identify the square whose value has changed since last move
  let diffSquare;
  if (move > 0) {
    historyMoveCurrent.map((el, i) => {
      if (el !== historyMovePrevious[i]) {
        return diffSquare = i;
      }
    })
  }
  // assign row and col manually based upon index of square that was changed for this move
  let col;
  let row;
  switch (diffSquare) {
    case 0:
      col = 1;
      row = 1;
      break;
    case 1:
      col = 2;
      row = 1;
      break;
    case 2:
      col = 3;
      row = 1;
      break;
    case 3:
      col = 1;
      row = 2;
      break;
    case 4:
      col = 2;
      row = 2;
      break;
    case 5:
      col = 3;
      row = 2;
      break;
    case 6:
      col = 1;
      row = 3;
      break;
    case 7:
      col = 2;
      row = 3;
      break;
    case 8:
      col = 3;
      row = 3;
      break;
    default:
      col = '';
      row = '';
  }
  return ` (${col}, ${row})`;
}