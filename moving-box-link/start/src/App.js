import React, { useRef, useEffect } from 'react';
import useMovement from './useMovement';
import './App.css';

export default function App() {
  const canvasRef = useRef(null);
  const linkDownRef = useRef(null);
  const linkRightRef = useRef(null);
  const linkUpRef = useRef(null);
  const linkLeftRef = useRef(null);
  const { x, y, move, direction } = useMovement();

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    switch (direction) {
      case 'down':
        context.drawImage(linkDownRef.current, x, y);
        break;
      case 'left':
        context.drawImage(linkLeftRef.current, x, y);
        break;
      case 'up':
        context.drawImage(linkUpRef.current, x, y);
        break;
      case 'right':
        context.drawImage(linkRightRef.current, x, y);
        break;
      default:
        break;
    }
  }, [x, y, direction]);

  return (
    <div className='app'>
      <canvas ref={canvasRef} />

      <div className='arrows'>
        <button onClick={() => move('up')}>Up</button>
        <button onClick={() => move('left')}>Left</button>
        <button onClick={() => move('down')}>Down</button>
        <button onClick={() => move('right')}>Right</button>
      </div>

      <div className='images'>
        <img
          ref={linkDownRef}
          src='https://i.imgur.com/JYUB0m3.png'
          alt='Down'
        />
        <img
          ref={linkRightRef}
          src='https://i.imgur.com/GEXD7bk.gif'
          alt='Right'
        />
        <img ref={linkUpRef} src='https://i.imgur.com/XSA2Oom.gif' alt='Up' />
        <img
          ref={linkLeftRef}
          src='https://i.imgur.com/4LGAZ8t.gif'
          alt='Left'
        />
      </div>
    </div>
  );
}
