import React from 'react';

import { renderComponent } from '../helpers/Helpers';

function WinsAndLosses({ gameState, restartGame, userChoice, computerChoice }) {
  return (
    <div className={`game-state ${gameState}`} onClick={() => restartGame()}>
      <div>
        <div className='game-state-content'>
          <p>{renderComponent(userChoice)}</p>
          {gameState === 'win' && <p>Congrats! You won!</p>}
          {gameState === 'lose' && <p>Sorry. You lost.</p>}
          {gameState === 'draw' && <p>It's a draw!</p>}
          <p>{renderComponent(computerChoice)}</p>
        </div>
        <button>Play again</button>
      </div>
    </div>
  );
}

export default WinsAndLosses;
