import { useEffect, useState } from 'react';
import { ArrowKeySet, Board, Button, GameOverPrompt } from './components';
import { calculateGameOver, calculateGameWon, generateInitialBoard, generateRandomNum, renderBoard } from './utils';

const App = () => {
  const [board, setBoard] = useState(() => generateInitialBoard());
  const [direction, setDirection] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [wait, setWait] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (wait) return;
      const key = { ArrowDown: 'down', ArrowUp: 'up', ArrowLeft: 'left', ArrowRight: 'right' }[e.key] || '';
      setDirection(key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
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
    console.log(board);
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

  return (
    <>
      {gameOver && <GameOverPrompt title='Game Over' description='Game ended, You Lost the Match.' actions={<Button name='New Game' handleClick={resetGame} />} />}
      {gameWon && <GameOverPrompt title='You won!' description='Game ended, You won the Match.' actions={<Button name='New Game' handleClick={resetGame} />} />}
      <div className='flex flex-col h-screen justify-evenly items-center border-0 focus:outline-none noselect'>
        <Board board={board} />
        <ArrowKeySet handleKey={key => setDirection(key)} />
        <div className='flex flex-wrap justify-center items-center'>
          <Button name='New Game' handleClick={resetGame} />
        </div>
      </div>
    </>
  );
};

export default App;
