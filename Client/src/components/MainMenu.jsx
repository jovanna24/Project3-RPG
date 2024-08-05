// src/components/MainMenu.jsx
import React from 'react';
import '../styles/mainMenu.css'; // Create this CSS file for styling

function MainMenu({ onStartGame }) {
  return (
    <div className="main-menu">
      <h1>Welcome to the Game!</h1>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
}

export default MainMenu;
