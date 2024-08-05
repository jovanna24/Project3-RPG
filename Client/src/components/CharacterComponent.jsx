import React, { useState, useEffect, useRef } from 'react';
import '../styles/variables.css';
import '../styles/global.css';
import '../styles/character.css';
import '../styles/background.css';
import '../styles/secondCharacter.css';
import '../styles/controls.css';
import DeathScreen from './DeathScreen'; // Import the DeathScreen component

function CharacterComponent() {
  const [direction, setDirection] = useState('idle');
  const [bgAnimation, setBgAnimation] = useState('');
  const [charAnimation, setCharAnimation] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const [secondCharIn, setSecondCharIn] = useState(false);
  const [imageSrc, setImageSrc] = useState('/Characters/idle.png'); // Default idle image
  const [isDead, setIsDead] = useState(false); // New state to manage dead state
  const characterRef = useRef(null);
  const secondCharacterRef = useRef(null);

  useEffect(() => {
    // Automatically stop the game after 10 seconds
    const timer = setTimeout(() => {
      handleStop();
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      const characterElem = characterRef.current;
      const secondCharacterElem = secondCharacterRef.current;

      if (characterElem && secondCharacterElem) {
        const characterRect = characterElem.getBoundingClientRect();
        const secondCharacterRect = secondCharacterElem.getBoundingClientRect();

        if (
          characterRect.left < secondCharacterRect.right &&
          characterRect.right > secondCharacterRect.left &&
          characterRect.top < secondCharacterRect.bottom &&
          characterRect.bottom > secondCharacterRect.top
        ) {
          setIsDead(true); // Trigger the dead state
          setImageSrc('/Characters/dead.png'); // Change to dead image
        }
      }
    };

    // Check collision periodically
    const interval = setInterval(checkCollision, 100);

    return () => clearInterval(interval); // Cleanup interval if component unmounts
  }, [secondCharIn]);

  const handleDirectionChange = (newDirection, showSecondChar = false) => {
    if (isDead) return; // Prevent any actions if the character is dead
 
    setDirection(newDirection);
    switch (newDirection) {
      case 'left':
        setImageSrc('/Characters/run-left.png'); // Image for moving left
        setBgAnimation('forward');
        setCharAnimation('move');
        break;
      case 'right':
        setImageSrc('/Characters/run-right.png'); // Image for moving right
        setBgAnimation('reverse');
        setCharAnimation('move');
        if (showSecondChar) {
          setSecondCharIn(true); // Show the second character
        }
        break;
      default:
        handleStop(); // Handle stopping
        break;
    }
 
    // Automatically set back to idle after running (e.g., 1 second delay)
    setTimeout(() => {
      handleStop();
    }, 10000); // Adjust the time as needed
  };

  const handleStop = () => {
    setDirection('idle');
    setImageSrc('/Characters/idle.png'); // Idle image
    setBgAnimation(''); // Stop background animation
    setCharAnimation(''); // Stop character animation
    setSecondCharIn(false); // Hide second character
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

  const handleRestart = () => {
    setIsDead(false); // Reset dead state
    setDirection('idle');
    setImageSrc('/Characters/idle.png'); // Reset to idle image
    setBgAnimation(''); // Reset background animation
    setCharAnimation(''); // Reset character animation
    setSecondCharIn(false); // Hide second character
    setIsFirstPlay(true); // Reset music state
    setIsPlaying(false);
    const audio = document.getElementById('background-music');
    audio.pause(); // Stop the music
    audio.currentTime = 0; // Reset music to start
  };

  return (
    <div>
      <div className={`background ${bgAnimation}`}></div>
      <div className="app-container">
        <div
          className={`Character ${charAnimation} ${isDead ? 'dead' : ''}`}
          ref={characterRef}
        >
          <img
            className="Character_shadow pixelart"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png"
            alt="Shadow"
          />
          <img
            id="character"
            className={`Character_spritesheet pixelart face-${direction}`}
            src={imageSrc}
            alt="Character"
          />
        </div>

        {/* Second Character (Skeleton) */}
        <div
          className={`SecondCharacter ${secondCharIn ? 'enter' : ''}`}
          ref={secondCharacterRef}
        >
          <img
            id="second-character"
            className="SecondCharacter_spritesheet pixelart"
            src="/Characters/attack-left.png" // Ensure the path is correct
            alt="Second Character"
          />
        </div>

        <div className="controls">
          {!isDead && (
            <>
              <button onClick={() => handleDirectionChange('left')}>Option A</button>
              <button onClick={() => handleDirectionChange('right', true)}>Option B</button>
              {isFirstPlay ? (
                <button onClick={toggleMusic}>Start Music</button>
              ) : (
                <button onClick={toggleMusic}>{isPlaying ? 'Pause Music' : 'Play Music'}</button>
              )}
            </>
          )}
        </div>
      </div>
      {isDead && <DeathScreen onRestart={handleRestart} />}
      <audio id="background-music" loop>
        <source src='/music/Jumanji.mp3' type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default CharacterComponent;
