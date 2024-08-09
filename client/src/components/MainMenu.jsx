// src/components/MainMenu.jsx
import React, { useEffect, useState } from 'react';
import '../styles/mainMenu.css';
import ChatBox from '../components/Chatbox/Chatbox'; // Import the ChatBox component
import AuthService from '../utils/auth'; // Update to use AuthService
import { SendBirdProvider } from "@sendbird/uikit-react";
import Chatbox from "../components/Chatbox/Chatbox.jsx";

function MainMenu({ onStartGame }) {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to track if the ChatBox is open
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.loggedIn()); // Use AuthService to check authentication

  useEffect(() => {
    // Set authentication state based on the current token
    setIsAuthenticated(AuthService.loggedIn());
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleLogout = () => {
    AuthService.logout(); // Properly handle logout
    setIsAuthenticated(false); // Update authentication state
  };

  const APP_ID = import.meta.env.VITE_APP_ID;
  const USER_ID = import.meta.env.VITE_USER_ID;
  const NICKNAME = import.meta.env.VITE_NICKNAME;
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  return (
    <div className="main-menu">
      <video className="background-video-main" autoPlay muted loop>
        <source src="videos/mainVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="menu-content">
        
      <SendBirdProvider appId={APP_ID} userId={USER_ID}>
        <h1>INTERACTIVE RPG</h1>
        {isAuthenticated ? (
          <>
            <button onClick={onStartGame}>Survive</button>
            <button onClick={toggleChat}>
              {isChatOpen ? 'Close Chat' : 'Open Chat'}
            </button>
            <button onClick={handleLogout}>Logout</button> 
          </>
        ) : (
          <p>Please log in to access the game and chat.</p> // Message for unauthenticated users
        )}
      {isChatOpen && <ChatBox />} {/* Conditionally render ChatBox */}
      </SendBirdProvider>
    </div>
    </div>
  );
}

export default MainMenu;
