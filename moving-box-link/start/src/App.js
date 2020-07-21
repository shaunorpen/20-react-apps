import React, { useRef, useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const canvasRef = useRef(null);
  const linkDownRef = useRef(null);
  const linkRightRef = useRef(null);
  const linkUpRef = useRef(null);
  const linkLeftRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState('down');

  function move(dir) {
    setDirection(dir);
    switch (dir) {
      case 'up':
        setY((y) => (y >= 20 ? y - 20 : y));
        break;
      case 'left':
        setX((x) => (x >= 20 ? x - 20 : x));
        break;
      case 'down':
        setY((y) => (y <= window.innerHeight - 30 ? y + 20 : y));
        break;
      case 'right':
        setX((x) => (x <= window.innerWidth - 30 ? x + 20 : x));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e) {
      switch (e.key) {
        case 'ArrowUp':
          move('up');
          break;
        case 'ArrowLeft':
          move('left');
          break;
        case 'ArrowDown':
          move('down');
          break;
        case 'ArrowRight':
          move('right');
          break;
        default:
          break;
      }
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
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
          src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgAgMAAAB4LiDsAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAADFBMVEUAiP+4+Bj/oETkXBC3SAr7AAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAABqSURBVBjTVc+hFsAgCIVhimXFV1uhWHw1C4XCq1kslju24OBP3zkQgIgK801vB+wljA6sKwFegu4mphnbMi71LKI029IDKqDKmD9gWMwWsBW2mgb4SHx/JNjiRgGAfO8c+BWzIsKHkyjgAWfBggG544yMAAAAAElFTkSuQmCC`}
          alt='Down'
        />
        <img
          ref={linkRightRef}
          src={`data:image/gif;base64,R0lGODlhHgAgAPEAAORcEACI/7j4GP+gRCH/C05FVFNDQVBFMi4wAwEAAAAh+QQBGQABACwAAAAAHgAgAAACqYyPqcvtj4ScEjpKbcIY+O9BHAWCDDcMZMkqqDqx7TEKaSqX7ngPubkRGCg9HKAnSe2Gk6LveEsOLgJQz3OF9nbWG9arvTFYTqchtCCXtwH0iVc+A6gvc3seBBGLXTet+rGX9eUnl+MkQYiH8BOWkgjlB3kYFYMnCUj5aCkXYcnC4Yc5WRK6eGcIUEOqJ4R657GaWeqKBirb8cFIi/t5mlqYMKMwnKaTUAAAOw==`}
          alt='Right'
        />
        <img
          ref={linkUpRef}
          src={`data:image/gif;base64,R0lGODlhGAAgAPEAALj4GORcEACI//+gRCH/C05FVFNDQVBFMi4wAwEAAAAh+QQBGQACACwAAAAAGAAgAAACgpQPqZvnzyJ4UFpq7D1jZB0ZXfeBizia2jioFhsErhLD8gzU7BDHVh/YjYC/HgsF9NGSJA4vuUgGPQelVJqIOaxXYi6w7c2ABq8K2DGb0E/l2di+gciCtHjdQ3Wy3XujnvLVJzeBgHNiePgXNpdE4SYhhSFAV3Y1WUl5OcmZyYmRWQAAOw==`}
          alt='Up'
        />
        <img
          ref={linkLeftRef}
          src={`data:image/gif;base64,R0lGODlhHgAgAPEAAORcEACI/7j4GP+gRCH/C05FVFNDQVBFMi4wAwEAAAAh+QQBGQABACwAAAAAHgAgAAACpoyPqcvtr4ScEjpK7QG8c4xBngdmzYgC1DCASjqubbjAHsuWwmtz+OxK5AQ/3w+4C1SEsyLgiDQsoUZWdUBKIqhP3DXLM0C5HgZHPHaWawA0VOc4B9LwU/d2pIATRvxP37GE0KdCdNTDY1VIlhIW8DGhliL42FYpowhDKWcACYhi0mkpCqI5MWgpYaqzJqc6qSOwJuoZ+9mBWmv7OrsxEvfL1suzVgAAOw==`}
          alt='Left'
        />
      </div>
    </div>
  );
}
