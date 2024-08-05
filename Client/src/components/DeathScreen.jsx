// src/components/DeathScreen.js
import React from 'react';
import '../styles/DeathScreen.css'; // Import your CSS file for styling

function DeathScreen({ onRestart }) {
  return (
    <div className="death-screen">
      <h1>Your death was inevitable</h1>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}

export default DeathScreen;
