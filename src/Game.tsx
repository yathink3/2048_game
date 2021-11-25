import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ArrowKeySet, Board, Button, GameOverPrompt } from './components';
import { calculateGameOver, calculateGameWon, generateInitialBoard, generateRandomNum, renderBoard } from './utils';

const App = () => {
  const [board, setBoard] = useState(() => generateInitialBoard());
  const [direction, setDirection] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [wait, setWait] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const focusRef = useRef<HTMLHeadingElement>(null);

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
    if (wait && !gameOver && !gameWon) {
      let idx = 0;
      do idx = Math.floor(Math.random() * 16);
      while (board[idx] != null);
      let num = generateRandomNum();
      const newBoard = [...board];
      newBoard[idx] = num;
      setWait(false);
      setBoard(newBoard);
    }
    if (!wait && !gameOver && !gameWon) setWait(false);
  }, [board, wait, gameOver]);

  useEffect(() => {
    if (!gameWon && calculateGameWon(board)) {
      setWait(true);
      setGameWon(true);
    }
    if (calculateGameOver(board)) setGameOver(true);
  }, [board, gameWon]);

  const resetGame = () => {
    setBoard(() => generateInitialBoard());
    setGameWon(false);
    setGameOver(false);
    setWait(false);
  };

  const continueGame = () => {
    setGameWon(false);
    setWait(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
    if (wait) return;
    const key = { ArrowDown: 'down', ArrowUp: 'up', ArrowLeft: 'left', ArrowRight: 'right' }[e.key] || '';
    setDirection(key);
  };

  return (
    <div tabIndex={0} ref={focusRef} onKeyDown={handleKeyDown} className='flex flex-col h-screen justify-evenly items-center border-0 focus:outline-none noselect'>
      <>
        {gameOver && <GameOverPrompt name={'Game Over'} handleClick={resetGame} />}
        {gameWon && <GameOverPrompt name={'You won!'} handleClick={resetGame} continueGame={continueGame} />}
        <div>{<Board board={board} />}</div>
        <ArrowKeySet handleKey={key => setDirection(key)} />
        <div className='flex flex-wrap justify-center items-center'>
          <Button name='New Game' handleClick={resetGame} />
        </div>
      </>
    </div>
  );
};

export default App;
