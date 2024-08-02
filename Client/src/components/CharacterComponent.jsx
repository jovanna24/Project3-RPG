import React, { useState, useEffect } from 'react';
import './character.css'; // Adjust the path if necessary

function CharacterComponent() {
  const [direction, setDirection] = useState('up');
  const [bgAnimation, setBgAnimation] = useState('');
  const [charAnimation, setCharAnimation] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const [secondCharIn, setSecondCharIn] = useState(false);

  const handleDirectionChange = (charDirection, bgDirection, charAnimDirection, triggerSecondChar = false) => {
    setDirection(charDirection);
    setBgAnimation(bgDirection);
    setCharAnimation(charAnimDirection);

    // Trigger the second character's movement only if triggerSecondChar is true
    if (triggerSecondChar) {
      setSecondCharIn(true);
    } else {
      setSecondCharIn(false);
    }

    // Reset states after 5 seconds
    setTimeout(() => {
      setDirection('up');
      setBgAnimation('');
      setCharAnimation('');
      setSecondCharIn(false); // Reset second character's position
    }, 5000);
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
            src="Characters/DemoRpgCharacter.png" // Ensure the path is correct
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
          <button onClick={() => handleDirectionChange('left', 'forward', 'reverse')}>Option A</button>
          <button onClick={() => handleDirectionChange('right', 'reverse', 'forward', true)}>Option B</button>
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
