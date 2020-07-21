import { useState, useEffect } from 'react';

export default function useMovement() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState('down');

  function move(dir) {
    setDirection(dir);
    switch (dir) {
      case 'up':
        setY((y) => y - 20);
        break;
      case 'left':
        setX((x) => x - 20);
        break;
      case 'down':
        setY((y) => y + 20);
        break;
      case 'right':
        setX((x) => x + 20);
        break;
      default:
        break;
    }
  }

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

  return { x, y, move, direction };
}
