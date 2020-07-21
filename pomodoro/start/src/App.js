import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

const messages = [
  `You can do this...just keep going!`,
  `Come on! You only just started!`,
  `I knew you'd give up...slacker!`,
  `Yeah, probably about time to quit.`,
  `Maybe try again tomorrow?`,
];

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin!');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [messageID, setMessageID] = useState(0);
  const intervalRef = useRef(null);

  function startTimer() {
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

  function stopTimer() {
    if (intervalRef.current === null) return;

    setTitle(messages[messageID]);

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setIsRunning(false);
    setMessageID((messageID) => (messageID + 1) % messages.length);
  }

  function resetTimer() {
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
    <div className='app'>
      <h2>{title}</h2>

      <div className='timer' style={{ fontSize: '15rem' }}>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className='buttons'>
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {showReset && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
