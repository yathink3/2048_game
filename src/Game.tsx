import { useEffect, useState } from 'react';
import { ArrowKeySet, Board, Button, GameOverPrompt } from './components';
import { useKeyBoard, useLocalStorage } from './hooks';
import { calculateGameOver, calculateGameWon, generateInitialBoard, generateRandomVal, getNewPos, renderBoard } from './utils';

const App = () => {
  const [board, setBoard] = useState(() => generateInitialBoard());
  const [direction, setDirection] = useState('');
  const [status, setStatus] = useState('');
  const [score, setScore] = useState(0);
  const [best, setBest] = useLocalStorage('best', 0);

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
        setScore(score + scoreVal);
      }
      setDirection('');
    }
  }, [direction, board]);

  const resetGame = () => {
    if (score > best) setBest(score);
    setBoard(() => generateInitialBoard());
    setScore(0);
    setStatus('');
    setDirection('');
  };

  return (
    <>
      {status === 'lost' && <GameOverPrompt title='Game Over' description='Game ended, You Lost the Match.' actions={<Button name='New Game' handleClick={resetGame} />} />}
      {status === 'won' && <GameOverPrompt title='You won!' description='Game ended, You won the Match.' actions={<Button name='New Game' handleClick={resetGame} />} />}
      <div className='flex flex-col h-screen justify-evenly items-center border-0 focus:outline-none noselect'>
        <div className='flex flex-row justify-evenly '>
          <span className='py-2 px-4 rounded-lg border-4 border-gray-200 items-center m-1'>SCORE : {score}</span>
          <span className='py-2 px-4 rounded-lg border-4 border-gray-200 items-center m-1'>BEST : {best}</span>
        </div>
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
