import { useEffect, useState } from 'react';
import { ArrowButton, Board, Button, GameOverPrompt } from './components';
import { useDarkMode, useKeyBoardArrows, useBoard } from './hooks';

const Game = ({ CROSS_NUMBER = 4, WINNING_NUMBER = 2048 }: { CROSS_NUMBER?: number; WINNING_NUMBER?: number }) => {
  const { status, board, score, best, runBoard, initializeBoard } = useBoard({ CROSS_NUMBER, WINNING_NUMBER });
  const [move, setMove] = useState('');
  useDarkMode();
  useKeyBoardArrows(status === '' && setMove);
  useEffect(() => void (runBoard(move), setMove('')), [move, board]);
  const resetGame = () => void (initializeBoard(), setMove(''));

  return (
    <div className='fixed md:relative flex flex-col min-h-screen min-w-full justify-evenly items-center border-0 focus:outline-none noselect dark:bg-gray-800'>
      {status === 'lost' && <GameOverPrompt title='Game Over' description={`Game ended, You Lost the Match. Your Score : ${score}`} actions={<Button name='New Game' handleClick={resetGame} />} />}
      {status === 'won' && <GameOverPrompt title='You won!' description='Game ended, You won the Match.' actions={<Button name='New Game' handleClick={resetGame} />} />}
      <div className='flex flex-row justify-evenly hidden md:block'>
        <div className='dark:text-white'>Use arrow keys to merge tiles and reach the 2048 tile.</div>
      </div>
      <div className='flex flex-row justify-evenly hidden'>
        <div className='dark:text-white'>Use ↓ ← ↑ → arrows to merge tiles and reach 2048.</div>
      </div>
      <div className='flex flex-row justify-evenly'>
        <span className='py-2 px-4 rounded-lg border-4 border-gray-200 items-center m-1 dark:text-white'>SCORE : {score}</span>
        <span className='py-2 px-4 rounded-lg border-4 border-gray-200 items-center m-1 dark:text-white'>BEST : {best}</span>
      </div>
      <Board board={board} cross_number={CROSS_NUMBER} />
      <div className='grid grid-cols-3 md:hidden'>
        <span />
        <ArrowButton arrowType='up' handleKey={setMove} />
        <span />
        <ArrowButton arrowType='left' handleKey={setMove} />
        <span />
        <ArrowButton arrowType='right' handleKey={setMove} />
        <span />
        <ArrowButton arrowType='down' handleKey={setMove} />
        <span />
      </div>
      <div className='flex flex-wrap justify-center items-center'>
        <Button name='New Game' handleClick={resetGame} />
      </div>
    </div>
  );
};

export default Game;
