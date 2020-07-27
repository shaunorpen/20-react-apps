import React, { useState } from 'react';
import useTrivia from './useTrivia';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {
  const [question, getQuestion, category, setCategory] = useTrivia();
  const [isCorrect, setIsCorrect] = useState(null);

  function handleQuestionAnswered(answer) {
    setIsCorrect(answer === question.correct_answer);
  }

  function handleNextQuestion() {
    setIsCorrect(null);
    getQuestion();
  }

  return (
    <div className='app'>
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && (
        <ResultModal
          isCorrect={isCorrect}
          correctAnswer={question.correct_answer}
          getQuestion={handleNextQuestion}
        />
      )}

      {/* question header ----------------------- */}
      <div className='question-header'>
        <CategorySelector category={category} chooseCategory={setCategory} />
        <Scoreboard isCorrect={isCorrect} />
      </div>

      {/* the question itself ----------------------- */}
      <div className='question-main'>
        {question && (
          <Question
            question={question}
            answerQuestion={handleQuestionAnswered}
          />
        )}
      </div>

      {/* question footer ----------------------- */}
      <div className='question-footer'>
        <button onClick={handleNextQuestion}>
          Go to next question{' '}
          <span role='img' aria-label='Finger pointing right'>
            👉
          </span>
        </button>
      </div>
    </div>
  );
}
