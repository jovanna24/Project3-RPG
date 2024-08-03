import React, { useState, useEffect } from 'react';
import './character.css'; // Adjust the path if necessary

function CharacterComponent() {
  const [direction, setDirection] = useState('idle');
  const [bgAnimation, setBgAnimation] = useState('');
  const [charAnimation, setCharAnimation] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const [secondCharIn, setSecondCharIn] = useState(false);
  const [imageSrc, setImageSrc] = useState('Characters/idle.png'); // Default idle image

  useEffect(() => {
    // Automatically stop the game after 10 seconds
    const timer = setTimeout(() => {
      handleStop();
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);

  useEffect(() => {
    const handleAnimationEnd = () => {
      // Reset to the original position after animations end
      handleStop();
    };

    const backgroundElement = document.querySelector('.background');
    const characterElement = document.querySelector('.Character');
    const secondCharacterElement = document.querySelector('.SecondCharacter');

    if (backgroundElement) {
      backgroundElement.addEventListener('animationend', handleAnimationEnd);
    }
    if (characterElement) {
      characterElement.addEventListener('animationend', handleAnimationEnd);
    }
    if (secondCharacterElement) {
      secondCharacterElement.addEventListener('transitionend', handleAnimationEnd);
    }

    return () => {
      if (backgroundElement) {
        backgroundElement.removeEventListener('animationend', handleAnimationEnd);
      }
      if (characterElement) {
        characterElement.removeEventListener('animationend', handleAnimationEnd);
      }
      if (secondCharacterElement) {
        secondCharacterElement.removeEventListener('transitionend', handleAnimationEnd);
      }
    };
  }, []);

  const handleDirectionChange = (newDirection, showSecondChar = false) => {
    setDirection(newDirection);
    switch (newDirection) {
      case 'left':
        setImageSrc('Characters/run-left.png'); // Image for moving left
        setBgAnimation('forward'); // Set the background animation to forward
        setCharAnimation('move'); // Set the character animation to move
        break;
      case 'right':
        setImageSrc('Characters/run-right.png'); // Image for moving right
        setBgAnimation('reverse'); // Set the background animation to reverse
        setCharAnimation('move'); // Set the character animation to move
        if (showSecondChar) {
          setSecondCharIn(true); // Show the second character
        }
        break;
      default:
        handleStop(); // Handle stopping
        break;
    }
  };

  const handleStop = () => {
    setDirection('idle');
    setImageSrc('Characters/idle.png'); // Idle image
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
            src={imageSrc}
            alt="Character"
          />
        </div>

        {/* Second Character (Skeleton) */}
        <div className={`SecondCharacter ${secondCharIn ? 'enter' : ''}`}>
          <img
            id="second-character"
            className="SecondCharacter_spritesheet pixelart"
            src="Characters/attack-left.png" // Ensure the path is correct
            alt="Second Character"
          />
        </div>

        <div className="controls">
          <button onClick={() => handleDirectionChange('left')}>Option A</button>
          <button onClick={() => handleDirectionChange('right', true)}>Option B</button>
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
