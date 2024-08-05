// src/components/CharacterComponent.js
// NOTHING NEEDS TO BE CHANGED HERE  - DANIEL
//
//
//
//
//
//
//
//
//
//
//
//
//

import React, { useEffect, useState } from 'react';
import { useCharacterState } from './CharacterHooks';
import { handleAnswer, handleStop, toggleMusic, handleRestart } from './CharacterLogic';
import DeathScreen from './DeathScreen';
import { questions } from './questions';

function CharacterComponent({ onReturnToMenu }) {
  // Destructure state and refs from the custom hook
  const {
    direction, setDirection,               // Controls the direction the character is facing
    bgAnimation, setBgAnimation,           // Manages background animation (e.g., moving forward/reverse)
    charAnimation, setCharAnimation,       // Manages character animation (e.g., running, idle)
    isPlaying, setIsPlaying,               // Tracks whether background music is playing
    isFirstPlay, setIsFirstPlay,           // Tracks if it's the first play of the music
    secondCharIn, setSecondCharIn,         // Manages the state of the second character entering
    imageSrc, setImageSrc,                 // Sets the image source for the main character's sprite
    isDead, setIsDead,                     // Tracks if the main character is dead
    currentQuestion, setCurrentQuestion,   // Tracks the current question being asked
    isCorrect, setIsCorrect,               // Tracks if the answer given was correct
    characterRef, secondCharacterRef,      // References to the main and second characters in the DOM
  } = useCharacterState();

  const [skeletonImage, setSkeletonImage] = useState('/Characters/attack-right.png'); // Skeleton sprite image
  const [skeletonClass, setSkeletonClass] = useState('right');                        // CSS class to control skeleton's entry

  // Function to detect collision between the main character and the skeleton
  const detectCollision = () => {
    const character = characterRef.current;
    const secondCharacter = secondCharacterRef.current;

    if (character && secondCharacter) {
      const characterRect = character.getBoundingClientRect();
      const secondCharacterRect = secondCharacter.getBoundingClientRect();

      // Collision detection logic
      return (
        characterRect.left < secondCharacterRect.right &&
        characterRect.right > secondCharacterRect.left &&
        characterRect.top < secondCharacterRect.bottom &&
        characterRect.bottom > secondCharacterRect.top
      );
    }

    return false;
  };

  // Effect to periodically check for collisions
  useEffect(() => {
    if (isDead) return; // Skip collision checks if the character is already dead

    const interval = setInterval(() => {
      if (detectCollision()) {
        setIsDead(true);
        setImageSrc('/Characters/dead.png');
        setCharAnimation('dead');
        clearInterval(interval); // Stop checking for collisions if the character is dead
      }
    }, 1500);

    return () => clearInterval(interval); // Cleanup the interval when component unmounts
  }, [isDead, detectCollision, setImageSrc, setCharAnimation, setIsDead]);

  return (
    <div>
      {/* Background animation */}
      <div className={`background ${bgAnimation}`}></div>

      {/* Main container for the game */}
      <div className="app-container">
        {/* Main character rendering */}
        <div className={`Character ${charAnimation} ${isDead ? 'dead' : ''}`} ref={characterRef}>
          <img className="Character_shadow pixelart" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow" />
          <img id="character" className={`Character_spritesheet pixelart face-${direction}`} src={imageSrc} alt="Character" />
        </div>

        {/* Second character (skeleton) rendering */}
        <div className={`SecondCharacter ${skeletonClass} ${secondCharIn ? 'enter' : ''}`} ref={secondCharacterRef}>
          <img id="second-character" className="SecondCharacter_spritesheet pixelart" src={skeletonImage} alt="Second Character" />
        </div>

        {/* Controls and question display */}
        <div className="controls">
          {!isDead && currentQuestion < questions.length && (
            <div className="question-container">
              <p>{questions[currentQuestion].question}</p>
              <button onClick={() => handleAnswer('A', currentQuestion, setCurrentQuestion, setSecondCharIn, setIsCorrect, setImageSrc, setDirection, setBgAnimation, setCharAnimation, setIsDead, handleRestart, detectCollision, handleStop, setSkeletonImage, setSkeletonClass)}>
                {questions[currentQuestion].optionA}
              </button>
              <button onClick={() => handleAnswer('B', currentQuestion, setCurrentQuestion, setSecondCharIn, setIsCorrect, setImageSrc, setDirection, setBgAnimation, setCharAnimation, setIsDead, handleRestart, detectCollision, handleStop, setSkeletonImage, setSkeletonClass)}>
                {questions[currentQuestion].optionB}
              </button>
            </div>
          )}
          {/* Display when all questions have been answered */}
          {!isDead && currentQuestion >= questions.length && (
            <>
              <p>You've answered all the questions!</p>
              {isFirstPlay ? (
                <button onClick={() => toggleMusic(isPlaying, setIsPlaying, setIsFirstPlay)}>Start Music</button>
              ) : (
                <button onClick={() => toggleMusic(isPlaying, setIsPlaying, setIsFirstPlay)}>{isPlaying ? 'Pause Music' : 'Play Music'}</button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Death screen display */}
      {isDead && (
        <DeathScreen
          onRestart={() => handleRestart(setIsDead, setDirection, setImageSrc, setBgAnimation, setCharAnimation, setSecondCharIn, setIsFirstPlay, setIsPlaying, setCurrentQuestion, secondCharacterRef)}
          onGoToMenu={onReturnToMenu} // Pass down the handler for going to the main menu
        />
      )}

      {/* Background music */}
      <audio id="background-music" loop>
        <source src='/music/Jumanji.mp3' type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default CharacterComponent;
