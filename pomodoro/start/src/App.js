import React, { useState, useRef } from 'react';
// import './App.css';
import 'tailwindcss/dist/tailwind.min.css';

function padTime (time) {
  return time.toString().padStart(2, '0');
}

export default function App () {
  const [title, setTitle] = useState('Let the countdown begin!');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const intervalRef = useRef(null);

  function startTimer () {
    if (intervalRef.current !== null) return;

    setTitle("You're doing great!");

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          return timeLeft - 1;
        }
        resetTimer();
      });
    }, 1000);

    setIsRunning(true);
    setShowReset(true);
  }

  function stopTimer () {
    if (intervalRef.current === null) return;

    setTitle('Keep it up!');

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setIsRunning(false);
  }

  function resetTimer () {
    setTitle('Let the countdown begin!');

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setTimeLeft(25 * 60);
    setIsRunning(false);
    setShowReset(false);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft % 60);

  return (
    <div className='bg-green-300 flex flex-col justify-center items-center h-screen'>
      <h2 className='mb-8 text-4xl tracking-tight leading-10 text-gray-900'>{title}</h2>

      <div className='timer font-extrabold text-gray-900' style={{ fontSize: '15rem' }}>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className='buttons mt-8'>
        {!isRunning && <button className='px-8 py-3 border border-transparent leading-6 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green' onClick={startTimer}>Start</button>}
        {isRunning && <button className='px-8 py-3 border border-transparent leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red' onClick={stopTimer}>Stop</button>}
        {showReset && <button className='ml-4 px-8 py-3 border border-transparent leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo' onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
