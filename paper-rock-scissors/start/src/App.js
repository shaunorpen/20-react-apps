import React, { useState, useEffect } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

import Game from './components/Game';
import WinsAndLosses from './components/WinsAndLosses';
import Info from './components/Info';

const choices = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 },
];

export default function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    restartGame();
  }, []);

  function restartGame() {
    setGameState(null);
    setUserChoice(null);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }

  function handleUserChoice(choice) {
    const chosenChoice = choices.find((c) => c.id === choice);
    setUserChoice(chosenChoice);

    if (chosenChoice.losesTo === computerChoice.id) {
      setGameState('lose');
      setLosses((losses) => losses + 1);
    } else if (computerChoice.losesTo === chosenChoice.id) {
      setGameState('win');
      setWins((wins) => wins + 1);
    } else {
      setGameState('draw');
    }
  }

  return (
    <div className='app'>
      {/* information goes here */}
      <Info wins={wins} losses={losses} />

      {gameState && (
        <WinsAndLosses
          gameState={gameState}
          restartGame={restartGame}
          userChoice={userChoice}
          computerChoice={computerChoice}
        />
      )}
      <Game handleUserChoice={handleUserChoice} />
    </div>
  );
}
