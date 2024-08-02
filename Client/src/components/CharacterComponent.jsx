import React, { useState, useEffect } from 'react';
import './character.css'; // Adjust the path if necessary

function CharacterComponent() {
  const [direction, setDirection] = useState('up'); // Default direction is "up"
  const [bgAnimation, setBgAnimation] = useState(''); // Default background animation
  const [charAnimation, setCharAnimation] = useState(''); // Character animation direction
  const [isPlaying, setIsPlaying] = useState(false); // Manage music play state
  const [isFirstPlay, setIsFirstPlay] = useState(true); // Track first play to handle autoplay restrictions

  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset direction and animations after 5 seconds
      setDirection('up');
      setBgAnimation('');
      setCharAnimation('');
    }, 10000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [direction, bgAnimation, charAnimation]); // Dependency array ensures timer restarts on state change

  const handleDirectionChange = (charDirection, bgDirection, charAnimDirection) => {
    setDirection(charDirection);
    setBgAnimation(bgDirection);
    setCharAnimation(charAnimDirection);

    // Set a timeout to reset state after 5 seconds
    setTimeout(() => {
      setDirection('up');
      setBgAnimation('');
      setCharAnimation('');
    }, 10000);
  };

  const toggleMusic = () => {
    const audio = document.getElementById('background-music');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.log('Music playback prevented by the browser:', error);
      });
    }
    setIsPlaying(!isPlaying);
    setIsFirstPlay(false);
  };

  // // const getCharacterImageSrc = () => {
  //   switch (direction) {
  //     case 'left':
  //       return '/Characters/walk-left-skel.png'; // Replace with the path to your left-facing image
  //     case 'right':
  //       return '/Characters/walk-right-skel.png'; // Replace with the path to your right-facing image
  //     default:
  //       return '/Characters/idle-skel.png'; // Replace with the path to your up-facing image
  //   }
  // };

  return (
    <div>
      <div className={`background ${bgAnimation}`}></div>
      <div className="app-container">
        <div className={`Character ${charAnimation}`}>
          <img
            className="Character_shadow pixelart"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png"
            alt="Shadow"
          />
          <img
            id="character"
            className={`Character_spritesheet pixelart face-${direction}`}
            src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png' // Ensure the path is correct
            alt="Character"
          />
        </div>
        <div className="controls">
          <button onClick={() => handleDirectionChange('left', 'forward', 'reverse')}>Option A</button>
          <button onClick={() => handleDirectionChange('right', 'reverse', 'forward')}>Option B</button>
          {isFirstPlay ? (
            <button onClick={toggleMusic}>Start Music</button>
          ) : (
            <button onClick={toggleMusic}>{isPlaying ? 'Pause Music' : 'Play Music'}</button>
          )}
        </div>
      </div>
      <audio id="background-music" loop>
        <source src='/music/Jumanji.mp3' type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default CharacterComponent;
