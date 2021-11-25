export const Button = ({ name, handleClick }: { name: string; handleClick?: () => any }) => (
  <button className='py-2 px-4 bg-blue-400 rounded-lg border-4 border-gray-200 text-white m-1' onClick={handleClick}>
    {name}
  </button>
);

export const GameOverPrompt = ({ name, handleClick, continueGame }: { name: string; handleClick?: () => any; continueGame?: () => any }) => (
  <div className='flex justify-center w-64 flex-wrap opacity-75 bg-gray-600 border-gray-600 rounded-lg  fixed'>
    <div className='text-center text-6xl text-white'>{name}</div>
    <div className='text-base'>
      <Button name='New Game' handleClick={handleClick} />
      {name === 'You won!' && <Button name='continue' handleClick={continueGame} />}
    </div>
  </div>
);

export const Box = ({ value }: { value: number | null }) => {
  const style = { 2: 'bg-gray-300', 4: 'bg-blue-300', 8: 'bg-green-300', 16: 'bg-blue-500', 32: 'bg-purple-900', 64: 'bg-red-300', 128: 'bg-yellow-200', 256: 'bg-yellow-300', 512: 'bg-indigo-300', 1024: 'bg-pink-300', 2048: 'bg-gray-300' }[value || 0] || 'bg-gray-100';
  return <div className={`flex rounded-lg  justify-center items-center w-20 h-20 lg:w-24 lg:h-24 m-0.5 ${style} text-white sm:text-2xl lg:text-6xl font-semibold border-solid border border-gray-300`}>{value}</div>;
};

export const Board = ({ board }: { board: Array<number | null> }) => (
  <div className='grid grid-cols-4 rounded-xl border-solid border border-gray-300 p-1'>
    {board.map((v, i) => (
      <Box key={i} value={v} />
    ))}
  </div>
);

export const ArrowKeySet = ({ handleKey }: { handleKey: (v: string) => any }) => (
  <div className='grid grid-cols-3 md:hidden'>
    <span></span>
    <button className='rounded-lg border-4 border-gray-100' onClick={e => handleKey('up')}>
      <svg width='55' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <path data-name='layer1' fill='none' stroke='#202020' stroke-miterlimit='10' stroke-width='2' d='M20 40l11.994-14L44 40'></path>
      </svg>
    </button>
    <span></span>
    <button className='rounded-lg border-4 border-gray-100' onClick={e => handleKey('left')}>
      <svg width='55' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <path data-name='layer1' fill='none' stroke='#202020' stroke-miterlimit='10' stroke-width='2' d='M39 20.006L25 32l14 12.006'></path>
      </svg>
    </button>
    <span></span>
    <button className='rounded-lg border-4 border-gray-100' onClick={e => handleKey('right')}>
      <svg width='55' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <path data-name='layer1' fill='none' stroke='#202020' stroke-miterlimit='10' stroke-width='2' d='M26 20.006L40 32 26 44.006'></path>
      </svg>
    </button>
    <span></span>
    <button className='rounded-lg border-4 border-gray-100' onClick={e => handleKey('down')}>
      <svg width='55' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <path data-name='layer1' fill='none' stroke='#202020' stroke-miterlimit='10' stroke-width='2' d='M20 26l11.994 14L44 26'></path>
      </svg>
    </button>
    <span></span>
  </div>
);
