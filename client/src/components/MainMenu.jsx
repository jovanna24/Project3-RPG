// src/components/MainMenu.jsx
import React from 'react';
import '../styles/mainMenu.css'; // Create this CSS file for styling

function MainMenu({ onStartGame }) {
  return (
    <div className="main-menu">
      <video className="background-video-main" autoPlay muted loop>
        <source src="videos/mainVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="menu-content">
        <h1>INTERACTIVE RPG</h1>
        <button onClick={onStartGame}>Survive</button>
      </div>
    </div>
  );
}

export default MainMenu;
