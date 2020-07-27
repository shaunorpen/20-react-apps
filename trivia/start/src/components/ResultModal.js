import React from 'react';

export default function ResultModal({ isCorrect, correctAnswer, getQuestion }) {
  return (
    <div className={`result-modal ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
      <div className='overlay' />
      <div className='result-modal-content'>
        {isCorrect && (
          <h3>
            <span role='img' aria-label='Fistbump'>
              👊👊👊
            </span>
            <br />
            YOU WON!
          </h3>
        )}

        {!isCorrect && (
          <h3>
            <span role='img' aria-label='Sad faces'>
              😟😢😟
            </span>
            <br />
            YOU LOST!
          </h3>
        )}

        {!isCorrect && (
          <div className='correct-answer'>
            <small>The correct answer was:</small>
            <br />
            <strong dangerouslySetInnerHTML={{ __html: correctAnswer }} />
          </div>
        )}

        <button onClick={getQuestion}>
          Go to next question{' '}
          <span role='img' aria-label='Finger pointing right'>
            👉
          </span>
        </button>
      </div>
    </div>
  );
}
