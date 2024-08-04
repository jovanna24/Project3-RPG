// src/components/MainMenu.js
import React from 'react';
import '../styles/mainMenu.css'; // Ensure you have the appropriate CSS

const MainMenu = ({ onStart }) => {
  return (
    <div className="main-menu">
      <h1>Welcome to the Game</h1>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
};

export default MainMenu;
