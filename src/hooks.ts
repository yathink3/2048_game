import { useEffect, useState } from 'react';

export const useKeyBoardArrows = (handleKeyArrow: any) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = { ArrowDown: 'down', ArrowUp: 'up', ArrowLeft: 'left', ArrowRight: 'right' }[e.key] || '';
      if (key) handleKeyArrow instanceof Function && handleKeyArrow(key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};

export const useDarkMode = () => {
  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    window.document.body.classList.toggle('dark', darkMode);
  }, []);
};

export const useLocalStorage = (key: string, initialValue: any, refresh: boolean = false) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item && !refresh ? JSON.parse(item) : initialValue instanceof Function ? initialValue() : initialValue;
  });

  const setValue = (value: any) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  return [storedValue, setValue];
};

export const useBoard = ({ CROSS_NUMBER, WINNING_NUMBER }: { CROSS_NUMBER: number; WINNING_NUMBER: number }) => {
  const generateRandomPos = () => Math.floor(Math.random() * CROSS_NUMBER * CROSS_NUMBER);

  const generateRandomVal = () => (Math.random() >= 0.5 ? 2 : 4);

  const getNewPos = (board: Array<number | null>) => {
    let newPos = generateRandomPos();
    while (board[newPos] !== null) newPos = generateRandomPos();
    return newPos;
  };

  const generateInitialBoard = () => {
    let newBoard = Array(CROSS_NUMBER * CROSS_NUMBER).fill(null);
    newBoard[generateRandomPos()] = 2;
    newBoard[getNewPos(newBoard)] = generateRandomVal();
    return newBoard;
  };

  const [cNumner, setCNumber] = useLocalStorage('c_numner', CROSS_NUMBER);
  const c_numb_changed = cNumner === CROSS_NUMBER ? false : true;
  const [status, setStatus] = useLocalStorage('status', '', c_numb_changed);
  const [board, setBoard] = useLocalStorage('board', generateInitialBoard, c_numb_changed);
  const [score, setScore] = useLocalStorage('score', 0, c_numb_changed);
  const [best, setBest] = useLocalStorage('best', 0, c_numb_changed);

  const calculateGameWon = (board: Array<number | null>) => board.some(v => v === WINNING_NUMBER);

  const calculateGameOver = (board: Array<number | null>) => {
    const lastRound = board.every(v => v !== null);
    const moves = ['left', 'right', 'up', 'down'];
    const gameOver = lastRound && moves.every(move => JSON.stringify(board) === JSON.stringify(renderBoard(board, move).newBoard));
    return gameOver;
  };

  const renderBoard = (board: Array<number | null>, move: string) => {
    const newBoard = [...board];
    let scoreVal = 0;
    for (let i = 0; i < CROSS_NUMBER; i++) {
      let row = [];
      for (let j = 0; j < CROSS_NUMBER; j++) {
        if (['left', 'right'].includes(move)) row.push(board[i * CROSS_NUMBER + j]);
        if (['up', 'down'].includes(move)) row.push(board[j * CROSS_NUMBER + i]);
      }
      scoreVal = scoreVal + addAndSortRow(row, move);
      for (let j = 0; j < CROSS_NUMBER; j++) {
        if (['left', 'right'].includes(move)) newBoard[i * CROSS_NUMBER + j] = row[j];
        if (['up', 'down'].includes(move)) newBoard[j * CROSS_NUMBER + i] = row[j];
      }
    }
    return { newBoard, scoreVal };
  };

  const addAndSortRow = (row: Array<number | null>, move: string) => {
    let score = 0;
    let current = 0;
    let currentIdx = 0;
    if (['right', 'down'].includes(move)) row.reverse();
    row.forEach((v, i) => {
      if (current === v) {
        row[i] = null;
        row[currentIdx] = current * 2;
        score = score + current * 2;
        current = 0;
        currentIdx = 0;
      } else if (v !== null) {
        current = v;
        currentIdx = i;
      }
    });
    row.sort((a, b) => (b === null ? -1 : 0));
    if (['right', 'down'].includes(move)) row.reverse();
    return score;
  };

  const initializeBoard = () => {
    if (score > best) setBest(score);
    setBoard(generateInitialBoard);
    setScore(0);
    setStatus('');
  };

  const runBoard = (move: string) => {
    if (status === '' && move !== '') {
      let { newBoard, scoreVal } = renderBoard(board, move);
      if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
        newBoard[getNewPos(newBoard)] = generateRandomVal();
        if (calculateGameWon(newBoard)) setStatus('won');
        else if (calculateGameOver(newBoard)) setStatus('lost');
        setBoard(newBoard);
        setCNumber(CROSS_NUMBER);
        setScore(score + scoreVal);
      }
    }
  };

  return { status, board, score, best, runBoard, initializeBoard };
};
