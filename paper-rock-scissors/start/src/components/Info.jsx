import React from 'react';

function Info({ wins, losses }) {
  return (
    <div className='info'>
      <h2>Rock. Paper. Scissors</h2>

      {/* wins vs losses stats */}
      <div className='wins-losses'>
        <div className='wins'>
          <span className='number'>{wins}</span>
          <span className='text'>Win{wins === 1 ? '' : 's'}</span>
        </div>

        <div className='losses'>
          <span className='number'>{losses}</span>
          <span className='text'>Loss{losses === 1 ? '' : 'es'}</span>
        </div>
      </div>
    </div>
  );
}

export default Info;
