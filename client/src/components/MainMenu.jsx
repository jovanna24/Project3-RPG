import React, { useEffect, useState } from 'react';
import '../styles/mainMenu.css';
import Chatbox from '../components/Chatbox/Chatbox';
import AuthService from '../utils/auth';
import { SendBirdProvider } from "@sendbird/uikit-react";

function MainMenu({ onStartGame }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.loggedIn());

  useEffect(() => {
    setIsAuthenticated(AuthService.loggedIn());
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
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
        <SendBirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME} accessToken={ACCESS_TOKEN}>
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
            <p>Please log in to access the game and chat.</p>
          )}
          {isChatOpen && <Chatbox />}
        </SendBirdProvider>
      </div>
    </div>
  );
}
console.log(import.meta.env);

export default MainMenu;