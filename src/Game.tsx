import { useEffect, useState } from 'react';
import { ArrowKeySet, Board, Button, GameOverPrompt } from './components';
import { useDarkMode, useKeyBoard, useLocalStorage } from './hooks';
import useUtils from './utils';

const Game = ({ cross_number = 4, winning_number = 2048 }: { cross_number?: number; winning_number?: number }) => {
  const { calculateGameOver, calculateGameWon, generateInitialBoard, generateRandomVal, getNewPos, renderBoard } = useUtils({ CROSS_NUMBER: cross_number, WINNING_NUMBER: winning_number });
  const [cNumner, setCNumber] = useLocalStorage('c_numner', cross_number);
  const c_numb_changed = cNumner === cross_number ? false : true;
  const [direction, setDirection] = useState('');
  const [status, setStatus] = useLocalStorage('status', '', c_numb_changed);
  const [board, setBoard] = useLocalStorage('board', generateInitialBoard, c_numb_changed);
  const [score, setScore] = useLocalStorage('score', 0, c_numb_changed);
  const [best, setBest] = useLocalStorage('best', 0, c_numb_changed);

  useDarkMode();

  useKeyBoard(e => {
    if (status === '') {
      const key = { ArrowDown: 'down', ArrowUp: 'up', ArrowLeft: 'left', ArrowRight: 'right' }[e.key] || '';
      setDirection(key);
    }
  });

  useEffect(() => {
    if (status === '' && direction !== '') {
      let { newBoard, scoreVal } = renderBoard(board, direction);
      if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
        newBoard[getNewPos(newBoard)] = generateRandomVal();
        if (calculateGameWon(newBoard)) setStatus('won');
        else if (calculateGameOver(newBoard)) setStatus('lost');
        setBoard(newBoard);
        setCNumber(cross_number);
        setScore(score + scoreVal);
      }
      setDirection('');
    }
  }, [direction, board]);

  const resetGame = () => {
    if (score > best) setBest(score);
    setBoard(generateInitialBoard);
    setScore(0);
    setStatus('');
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
