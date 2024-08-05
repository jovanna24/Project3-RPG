// src/App.js
import React, { useState } from 'react';
import CharacterComponent from './components/CharacterComponent';
import MainMenu from './components/MainMenu';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const goToMainMenu = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="App">
      {!isGameStarted ? (
        <MainMenu onStart={startGame} />
      ) : (
        <CharacterComponent onGameOver={goToMainMenu} />
      )}
    </div>
  );
}

export default App;
