import { ReactNode } from 'react';

export const Button = ({ name, handleClick }: { name: string; handleClick?: () => any }) => (
  <button className='py-2 px-4 bg-blue-400 rounded-lg border-4 border-gray-200 text-white m-1' onClick={handleClick}>
    {name}
  </button>
);

export const GameOverPrompt = ({ title, description, actions }: { title?: ReactNode; description?: ReactNode; actions?: ReactNode }) => (
  <div className='fixed z-10 inset-0 overflow-y-auto'>
    <div className='items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center block p-0'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
      <span className='inline-block align-middle h-screen'>&#8203;</span>
      <div className='inline-block  bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full'>
        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
              <h3 className='text-2xl leading-6 font-medium text-gray-900' id='modal-title'>
                {title}
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>{description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50  py-3 px-6 flex justify-center md:justify-end'>{actions}</div>
      </div>
    </div>
  </div>
);

export const Tile = ({ value }: { value: number | null }) => {
  const style = { 2: 'bg-gray-500', 4: 'bg-blue-300', 8: 'bg-green-300', 16: 'bg-blue-500', 32: 'bg-purple-900', 64: 'bg-red-300', 128: 'bg-yellow-200', 256: 'bg-yellow-300', 512: 'bg-indigo-300', 1024: 'bg-pink-300', 2048: 'bg-gray-300', 4096: 'bg-pink-700' }[value || 0] || 'bg-gray-100 dark:bg-gray-800';
  return <div className={`flex rounded-lg  justify-center items-center w-20 h-20 lg:w-24 lg:h-24 m-0.5 ${style} text-white sm:text-2xl lg:text-6xl font-semibold border-solid border border-gray-300`}>{value}</div>;
};

export const Board = ({ board, cross_number }: { board: Array<number | null>; cross_number: number }) => {
  const style = { 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 7: 'grid-cols-7', 8: 'grid-cols-8', 9: 'grid-cols-9', 10: 'grid-cols-10' }[cross_number] || 'grid-cols-4';
  return (
    <div className={`grid ${style} rounded-xl border-solid border border-gray-300 p-1`}>
      {board.map((v, i) => (
        <Tile key={i} value={v} />
      ))}
    </div>
  );
};

export const ArrowKeySet = ({ handleKey }: { handleKey: (v: string) => any }) => (
  <div className='grid grid-cols-3 md:hidden'>
    <span></span>
    <button className='transform active:scale-110 motion-reduce:transform-none rounded-lg border-4 border-gray-100 dark:text-white' onClick={e => handleKey('up')}>
      <svg width='55' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <path className='fill-current' stroke='#202020' strokeMiterlimit='10' strokeWidth='2' d='M20 40l11.994-14L44 40'></path>
      </svg>
    </button>
    <span></span>
    <button className='transform active:scale-110 motion-reduce:transform-none rounded-lg border-4 border-gray-100 dark:text-white' onClick={e => handleKey('left')}>
      <svg width='55' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <path className='fill-current' stroke='#202020' strokeMiterlimit='10' strokeWidth='2' d='M39 20.006L25 32l14 12.006'></path>
      </svg>
    </button>
    <span></span>
    <button className='transform active:scale-110 motion-reduce:transform-none rounded-lg border-4 border-gray-100 dark:text-white' onClick={e => handleKey('right')}>
      <svg width='55' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <path className='fill-current' stroke='#202020' strokeMiterlimit='10' strokeWidth='2' d='M26 20.006L40 32 26 44.006'></path>
      </svg>
    </button>
    <span></span>
    <button className='transform active:scale-110 motion-reduce:transform-none rounded-lg border-4 border-gray-100 dark:text-white' onClick={e => handleKey('down')}>
      <svg width='55' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
        <path className='fill-current' stroke='#202020' strokeMiterlimit='10' strokeWidth='2' d='M20 26l11.994 14L44 26'></path>
      </svg>
    </button>
    <span></span>
  </div>
);
