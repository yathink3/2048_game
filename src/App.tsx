import React, { useEffect, useRef, useState } from 'react';

const Button = (props: any) => {
  const handleClick = () => {
    if (props.wait) return;
    props.move(props.name);
  };

  let color = 'bg-blue-400';

  return (
    <button className={`py-2 px-4 ${color} rounded-lg border-4 border-gray-200 text-white m-1`} onClick={props.handleClick ? props.handleClick : handleClick}>
      {props.name}
    </button>
  );
};

const GameOverPrompt = (props: any) => {
  return (
    <div className='flex justify-center w-64 flex-wrap opacity-75 bg-gray-600 border-gray-600 rounded-lg  fixed'>
      <div className='text-center text-6xl text-white'>{props.name}</div>
      <div className='text-base'>
        <Button name='New Game' handleClick={props.handleClick} />
        {props.name === 'You won!' && <Button name='continue' handleClick={props.continueGame} />}
      </div>
    </div>
  );
};

const Box = ({ value }: { value: number }) => {
  const style = { 2: 'bg-gray-300', 4: 'bg-blue-300', 8: 'bg-green-300', 16: 'bg-blue-500', 32: 'bg-purple-300', 64: 'bg-red-300', 128: 'bg-teal-300', 256: 'bg-yellow-300', 512: 'bg-indigo-300', 1024: 'bg-pink-300', 2048: 'bg-gray-300' }[value] || 'bg-gray-100';
  return <div className={`flex rounded-lg justify-center items-center w-20 h-20 lg:w-24 lg:h-24 m-0.5 ${style} text-white sm:text-2xl lg:text-6xl font-semibold border-solid border border-gray-300`}>{value}</div>;
};

const Board = (props: any) => {
  return (
    <div className='grid grid-cols-4 rounded-lg border-4 border-gray-100 bg-gray-100'>
      {props.board.map((v: any, i: any) => {
        return <Box key={i} value={v} />;
      })}
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(() => generateInitialBoard());
  const [direction, setDirection] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [wait, setWait] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const focusRef = useRef<HTMLHeadingElement>(null);

  const gameWonRef = useRef(gameWon);
  const slide = (dir: any) => {
    if (!wait) {
      setDirection(dir);
    }
  };

  // render when mounted
  // this will focus the board so that users can play the game right away
  // using keyboard input without focusing manually
  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!wait && direction !== '' && !gameOver) {
      const newBoard = renderBoard(board, direction);
      if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
        setBoard(newBoard);
        setWait(true);
      }
      setDirection('');
    }
  }, [direction, board, wait, gameOver]);

  useEffect(() => {
    if (wait && !gameOver && !gameWonRef.current) {
      let idx = 0;
      do {
        idx = Math.floor(Math.random() * 16);
      } while (board[idx] != null);
      let num = generateRandomNum();
      const newBoard = [...board];
      newBoard[idx] = num;
      setWait(false);
      setBoard(newBoard);
    }
    if (!wait && !gameOver && !gameWonRef.current) setWait(false);
  }, [board, wait, gameOver]);

  useEffect(() => {
    if (!gameWon) {
      if (calculateGameWon(board)) {
        setWait(true);
        setGameWon(true);
        gameWonRef.current = true;
      }
    }
    if (calculateGameOver(board)) {
      setGameOver(true);
    }
  }, [board, gameWon]);

  // resets board
  const resetGame = () => {
    setBoard(() => generateInitialBoard());
    setGameWon(false);
    gameWonRef.current = false;
    setGameOver(false);
    setWait(false);
  };

  const continueGame = () => {
    gameWonRef.current = false;
    setWait(false);
  };

  const handleKeyDown = (e: any) => {
    if (wait) return;
    switch (e.key) {
      case 'ArrowDown':
        setDirection('down');
        break;
      case 'ArrowUp':
        setDirection('up');
        break;
      case 'ArrowLeft':
        setDirection('left');
        break;
      case 'ArrowRight':
        setDirection('right');
        break;
      default:
        break;
    }
  };

  return (
    <div tabIndex={0} ref={focusRef} onKeyDown={handleKeyDown} className='flex flex-col h-screen justify-evenly items-center border-0 focus:outline-none noselect'>
      <>
        {gameOver && <GameOverPrompt name={'Game Over'} handleClick={resetGame} />}
        {gameWonRef.current && <GameOverPrompt name={'You won!'} handleClick={resetGame} continueGame={continueGame} />}
        <div>{<Board board={board} />}</div>
        <div className='flex flex-wrap justify-center items-center'>
          <Button name='New Game' handleClick={resetGame} />
        </div>
      </>
    </div>
  );
};

const generateInitialBoard = () => {
  let num = Math.floor(Math.random() * 16);
  let secondNum = num;
  while (num === secondNum) {
    secondNum = Math.floor(Math.random() * 16);
  }

  let newBoard = Array(16).fill(null);
  newBoard[num] = 2;
  newBoard[secondNum] = 2;
  return newBoard;
};

const generateRandomNum = () => {
  const numIsTwo = Math.random() >= 0.5;
  return numIsTwo ? 2 : 4;
};

const calculateGameWon = (board: any) => {
  return board.some((v: any) => v === 2048);
};

const calculateGameOver = (board: any) => {
  let gameOver = false;

  const lastRound = board.every((v: any) => v != null);

  const moves = ['left', 'right', 'up', 'down'];

  let newBoard = board;
  if (lastRound) {
    gameOver = moves.every(move => {
      newBoard = renderBoard(board, move);
      // game is over so return true
      return JSON.stringify(board) === JSON.stringify(newBoard);
    });
  }
  return gameOver;
};

const renderBoard = (board: any, move: any) => {
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

const addRow = (row: any, move: any) => {
  let current = 0;
  let currentIdx = 0;
  if (move === 'right' || move === 'down') row.reverse();
  row.forEach((element: any, idx: any) => {
    if (current === element) {
      row[idx] = null;
      row[currentIdx] = current * 2;
      current = 0;
      currentIdx = 0;
      return;
    }
    if (element !== null) {
      current = element;
      currentIdx = idx;
      return;
    }
  });
  if (move === 'right' || move === 'down') row.reverse();
};

const moveRow = (row: any, move: any) => {
  if (move === 'left' || move === 'up') {
    row.sort((a: any, b: any) => {
      if (b > a) return 0;
      if (b == null) return -1;
      else return 0;
    });
  }
  if (move === 'right' || move === 'down') {
    row.sort((a: any, b: any) => {
      if (a > b) return 0;
      if (a == null) return -1;
      else return 0;
    });
  }
};

export default App;
