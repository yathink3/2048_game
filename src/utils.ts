export const generateRandomPos = () => Math.floor(Math.random() * 16);

export const generateRandomVal = () => (Math.random() >= 0.5 ? 2 : 4);

export const getNewPos = (board: Array<number | null>) => {
  let newPos = generateRandomPos();
  while (board[newPos] !== null) newPos = generateRandomPos();
  return newPos;
};

export const generateInitialBoard = () => {
  let newBoard = Array(16).fill(null);
  newBoard[generateRandomPos()] = 2;
  newBoard[getNewPos(newBoard)] = generateRandomVal();
  return newBoard;
};

export const calculateGameWon = (board: Array<number | null>) => board.some(v => v === 2048);

export const calculateGameOver = (board: Array<number | null>) => {
  const lastRound = board.every(v => v !== null);
  const moves = ['left', 'right', 'up', 'down'];
  const gameOver = lastRound && moves.every(move => JSON.stringify(board) === JSON.stringify(renderBoard(board, move).newBoard));
  return gameOver;
};

export const renderBoard = (board: Array<number | null>, move: string) => {
  const newBoard = [...board];
  let scoreVal = 0;
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      if (move === 'left' || move === 'right') row.push(board[i * 4 + j]);
      if (move === 'up' || move === 'down') row.push(board[j * 4 + i]);
    }
    if (row.length) {
      scoreVal = scoreVal + addRow(row, move);
      moveRow(row, move);
      for (let j = 0; j < 4; j++) {
        if (move === 'left' || move === 'right') newBoard[i * 4 + j] = row[j];
        if (move === 'up' || move === 'down') newBoard[j * 4 + i] = row[j];
      }
    }
  }
  return { newBoard, scoreVal };
};

const addRow = (row: Array<number | null>, move: string) => {
  let score = 0;
  let current = 0;
  let currentIdx = 0;
  if (move === 'right' || move === 'down') row.reverse();
  row.forEach((ele, idx) => {
    if (current === ele) {
      row[idx] = null;
      row[currentIdx] = current * 2;
      score = score + current * 2;
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
  return score;
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
