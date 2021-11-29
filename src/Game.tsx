import { useEffect, useState } from 'react';
import { ArrowKeySet, Board, Button, GameOverPrompt } from './components';
import { useDarkMode, useKeyBoard } from './hooks';
import useBoard from './utils';

const Game = ({ cross_number = 4, winning_number = 2048 }: { cross_number?: number; winning_number?: number }) => {
  const { status, board, score, best, runBoard, initializeBoard } = useBoard({ CROSS_NUMBER: cross_number, WINNING_NUMBER: winning_number });

  const [direction, setDirection] = useState('');

  useDarkMode();

  useKeyBoard(e => {
    if (status !== '') return;
    const key = { ArrowDown: 'down', ArrowUp: 'up', ArrowLeft: 'left', ArrowRight: 'right' }[e.key] || '';
    setDirection(key);
  });

  useEffect(() => {
    runBoard(direction);
    setDirection('');
  }, [direction, board]);

  const resetGame = () => {
    initializeBoard();
    setDirection('');
  };

  return (
    <>
      {status === 'lost' && <GameOverPrompt title='Game Over' description='Game ended, You Lost the Match.' actions={<Button name='New Game' handleClick={resetGame} />} />}
      {status === 'won' && <GameOverPrompt title='You won!' description='Game ended, You won the Match.' actions={<Button name='New Game' handleClick={resetGame} />} />}
      <div className='flex flex-col min-h-screen justify-evenly items-center border-0 focus:outline-none noselect dark:bg-gray-800'>
        <div className='flex flex-row justify-evenly '>
          <span className='py-2 px-4 rounded-lg border-4 border-gray-200 items-center m-1 dark:text-white'>SCORE : {score}</span>
          <span className='py-2 px-4 rounded-lg border-4 border-gray-200 items-center m-1 dark:text-white'>BEST : {best}</span>
        </div>
        <Board board={board} cross_number={cross_number} />
        <ArrowKeySet handleKey={key => setDirection(key)} />
        <div className='flex flex-wrap justify-center items-center'>
          <Button name='New Game' handleClick={resetGame} />
        </div>
      </div>
    </>
  );
};

export default Game;
