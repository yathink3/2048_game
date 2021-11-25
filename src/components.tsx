export const Button = ({ name, handleClick }: { name: string; handleClick?: () => any }) => {
  return (
    <button className={`py-2 px-4 bg-blue-400 rounded-lg border-4 border-gray-200 text-white m-1`} onClick={handleClick}>
      {name}
    </button>
  );
};

export const GameOverPrompt = ({ name, handleClick, continueGame }: { name: string; handleClick?: () => any; continueGame?: () => any }) => {
  return (
    <div className='flex justify-center w-64 flex-wrap opacity-75 bg-gray-600 border-gray-600 rounded-lg  fixed'>
      <div className='text-center text-6xl text-white'>{name}</div>
      <div className='text-base'>
        <Button name='New Game' handleClick={handleClick} />
        {name === 'You won!' && <Button name='continue' handleClick={continueGame} />}
      </div>
    </div>
  );
};

export const Box = ({ value }: { value: number | null }) => {
  const style = { 2: 'bg-gray-300', 4: 'bg-blue-300', 8: 'bg-green-300', 16: 'bg-blue-500', 32: 'bg-purple-900', 64: 'bg-red-300', 128: 'bg-yellow-200', 256: 'bg-yellow-300', 512: 'bg-indigo-300', 1024: 'bg-pink-300', 2048: 'bg-gray-300' }[value || 0] || 'bg-gray-100';
  return <div className={`flex rounded-lg  justify-center items-center w-20 h-20 lg:w-24 lg:h-24 m-0.5 ${style} text-white sm:text-2xl lg:text-6xl font-semibold border-solid border border-gray-300`}>{value}</div>;
};

export const Board = ({ board }: { board: Array<number | null> }) => {
  return (
    <div className='grid grid-cols-4 rounded-lg border-4 border-gray-100 bg-gray-100 '>
      {board.map((v, i) => (
        <Box key={i} value={v} />
      ))}
    </div>
  );
};
