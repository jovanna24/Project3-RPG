import './Home.css';
import React, { useState } from 'react';
import '../../styles/variables.css';
import '../../styles/global.css';
import '../../styles/character.css';
import '../../styles/background.css';
import '../../styles/secondCharacter.css';
import '../../styles/controls.css';
import CharacterComponent from '../../components/CharacterComponent';
import MainMenu from '../../components/MainMenu.jsx'; // Import your MainMenu component


const Home = () => {

  const [showMainMenu, setShowMainMenu] = useState(true);

  const handleStartGame = () => {
    setShowMainMenu(false); // Hide the main menu when starting the game
  };

  const handleReturnToMenu = () => {
    setShowMainMenu(true); // Show the main menu
  };
  

  return (
    <div className="welcome">
      {showMainMenu ? (
        <MainMenu onStartGame={handleStartGame} />
      ) : (
        <CharacterComponent onReturnToMenu={handleReturnToMenu} />
      )}
    </div>
  );
}

export default Home
