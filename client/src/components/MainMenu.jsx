// src/components/MainMenu.jsx
import React, { useState } from 'react';
import '../styles/mainMenu.css';
import ChatBox from '../components/Chatbox/Chatbox'; // Import the ChatBox component

function MainMenu({ onStartGame }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="main-menu">
      <video className="background-video-main" autoPlay muted loop>
        <source src="videos/mainVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="menu-content">
        <h1>INTERACTIVE RPG</h1>
        <button onClick={onStartGame}>Survive</button>
        <button onClick={toggleChat}>
          {isChatOpen ? 'Close Chat' : 'Open Chat'}
        </button>
      </div>
      {isChatOpen && <ChatBox />} {/* Conditionally render ChatBox */}
    </div>
  );
}

export default MainMenu;
