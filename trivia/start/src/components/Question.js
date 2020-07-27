import React from 'react';
import shuffle from 'lodash.shuffle';

export default function Question({ question, answerQuestion }) {
  const answers = shuffle([
    question.correct_answer,
    ...question.incorrect_answers,
  ]);
  return (
    <div className='question'>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />

      {answers.map((answer, index) => (
        <button
          key={index}
          dangerouslySetInnerHTML={{ __html: answer }}
          onClick={() => answerQuestion(answer)}
        />
      ))}
    </div>
  );
}
