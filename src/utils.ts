export const generateInitialBoard = () => {
  let num = Math.floor(Math.random() * 16);
  let secondNum = num;
  while (num === secondNum) secondNum = Math.floor(Math.random() * 16);
  let newBoard = Array(16).fill(null);
  newBoard[num] = 2;
  newBoard[secondNum] = 2;
  return newBoard;
};

export const generateRandomNum = () => (Math.random() >= 0.5 ? 2 : 4);

export const calculateGameWon = (board: Array<number | null>) => board.some(v => v === 2048);

export const calculateGameOver = (board: Array<number | null>) => {
  let gameOver = false;
  const lastRound = board.every(v => v !== null);
  const moves = ['left', 'right', 'up', 'down'];
  let newBoard = board;
  if (lastRound) {
    gameOver = moves.every(move => {
      newBoard = renderBoard(board, move);
      return JSON.stringify(board) === JSON.stringify(newBoard);
    });
  }
  return gameOver;
};

export const renderBoard = (board: Array<number | null>, move: string) => {
  const newBoard = [...board];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      if (move === 'left' || move === 'right') row.push(board[i * 4 + j]);
      if (move === 'up' || move === 'down') row.push(board[j * 4 + i]);
    }
    if (row != null && row.length > 0) {
      addRow(row, move);
      moveRow(row, move);
      for (let j = 0; j < 4; j++) {
        if (move === 'left' || move === 'right') newBoard[i * 4 + j] = row[j];
        if (move === 'up' || move === 'down') newBoard[j * 4 + i] = row[j];
      }
    }
  }
  return newBoard;
};

const addRow = (row: Array<number | null>, move: string) => {
  let current = 0;
  let currentIdx = 0;
  if (move === 'right' || move === 'down') row.reverse();
  row.forEach((ele, idx) => {
    if (current === ele) {
      row[idx] = null;
      row[currentIdx] = current * 2;
      current = 0;
      currentIdx = 0;
      return;
    }
    if (ele !== null) {
      current = ele;
      currentIdx = idx;
      return;
    }
  });
  if (move === 'right' || move === 'down') row.reverse();
};

const moveRow = (row: Array<number | null>, move: string) => {
  if (move === 'left' || move === 'up')
    row.sort((a, b) => {
      if ((b || 0) > (a || 0)) return 0;
      if (b == null) return -1;
      else return 0;
    });
  if (move === 'right' || move === 'down')
    row.sort((a, b) => {
      if ((a || 0) > (b || 0)) return 0;
      if (a == null) return -1;
      else return 0;
    });
};
