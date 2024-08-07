import React, { useEffect, useState } from 'react';
import { useCharacterState } from './CharacterHooks';
import { handleAnswer, handleStop, toggleMusic, handleRestart } from './CharacterLogic';
import DeathScreen from './DeathScreen';
import { questions } from './questions';

function CharacterComponent({ onReturnToMenu }) {
  // Destructure state and refs from the custom hook
  const {
    direction, setDirection,
    bgAnimation, setBgAnimation,
    charAnimation, setCharAnimation,
    isPlaying, setIsPlaying,
    isFirstPlay, setIsFirstPlay,
    secondCharIn, setSecondCharIn,
    imageSrc, setImageSrc,
    isDead, setIsDead,
    currentQuestion, setCurrentQuestion,
    isCorrect, setIsCorrect,
    characterRef, secondCharacterRef,
  } = useCharacterState();

  const [skeletonImage, setSkeletonImage] = useState('/Characters/attack-right.png');
  const [skeletonClass, setSkeletonClass] = useState('right');

  const detectCollision = () => {
    const character = characterRef.current;
    const secondCharacter = secondCharacterRef.current;

    if (character && secondCharacter) {
      const characterRect = character.getBoundingClientRect();
      const secondCharacterRect = secondCharacter.getBoundingClientRect();

      return (
        characterRect.left < secondCharacterRect.right &&
        characterRect.right > secondCharacterRect.left &&
        characterRect.top < secondCharacterRect.bottom &&
        characterRect.bottom > secondCharacterRect.top
      );
    }

    return false;
  };

  useEffect(() => {
    if (isDead) return;

    const interval = setInterval(() => {
      if (detectCollision()) {
        setIsDead(true);
        setImageSrc('/Characters/dead.png');
        setCharAnimation('dead');
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isDead, detectCollision, setImageSrc, setCharAnimation, setIsDead]);

  return (
    <div>
      {/* Background video */}
      <video autoPlay muted loop className="background-video">
        <source src="videos/gameOverlay.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
          {!isDead && currentQuestion >= questions.length && (
            <>
              <p>You leap into the water, blindly hoping the rushing current won’t wash you away. As soon as you hit the water you take a big gulp, quenching your thirst. Relief rushes over you as you are now at least temporarily satiated. However, you realize the water is running much faster than you anticipated. You cannot fight the current. You swim towards the cave wall, trying to find anything to grab onto. The wall is slick with no hand holds. At least you have air, right? You cannot see where you are going or how to get out, you just focus on staying afloat. You feel a large buoyant object brush past you, and you grab on with all remaining strength you have. You hang onto the large object, regaining your stamina. You continue to float in the dark, and after what seems like hours, you begin to see sunlight. As the beams hit your face, you are overwhelmed with relief. It seems as if the river through the cave was never ending. You end up on the other side of the mountain you landed on hours before, freezing cold after being in the water for so long. Luckily you start to hear shouting, as the river widens and calms. Some nearby campers have spotted you! They rush to your aid, and get you out of the water, giving you food and shelter. The campers usher you into their car, driving you to the nearest hospital. CONGRATS! YOU SURVIVED WITH MINOR INJURIES!
              </p>
              {isFirstPlay ? (
                <button onClick={() => toggleMusic(isPlaying, setIsPlaying, setIsFirstPlay)}>Start Music</button>
              ) : (
                <button onClick={() => toggleMusic(isPlaying, setIsPlaying, setIsFirstPlay)}>{isPlaying ? 'Pause Music' : 'Play Music'}</button>
              )}
            </>
          )}
        </div>
      </div>

      {isDead && (
        <DeathScreen
          onRestart={() => handleRestart(setIsDead, setDirection, setImageSrc, setBgAnimation, setCharAnimation, setSecondCharIn, setIsFirstPlay, setIsPlaying, setCurrentQuestion, secondCharacterRef)}
          onGoToMenu={onReturnToMenu}
        />
      )}

      <audio id="background-music" loop>
        <source src='/music/Jumanji.mp3' type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default CharacterComponent;
