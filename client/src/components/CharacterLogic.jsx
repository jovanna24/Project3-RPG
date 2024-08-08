
// 
//
// 
// 
// CHECK FOR BREAKS IN THE COMMENTS - DANIEL
//
// 
//
// 
//







import { questions } from './questions';

export const handleAnswer = (
  answer,
  currentQuestion,
  setCurrentQuestion,
  setSecondCharIn,
  setIsCorrect,
  setImageSrc,
  setDirection,
  setBgAnimation,
  setCharAnimation,
  setIsDead,
  handleRestart,
  detectCollision,
  handleStop,
  setSkeletonImage,
  setSkeletonClass // Ensure this is passed and used correctly
) => {
  // Retrieve the correct answer for the current question
  const correctAnswer = questions[currentQuestion].correctAnswer;

  // Determine the skeleton's entry direction based on the question index
  //
  //
  //
  // Here is where u set the opposite direction from which the skeleton will come from and the # of answers is changed in (currentQuestion % 2 === 0 ? 'left' : 'left';)
  const skeletonDirection = currentQuestion % 2 === 0 ? 'left' : 'right';

  // Set the direction and run animation based on the answer
  if (answer === 'A') {
    // Player chose option A, character runs to the left
    setDirection('left');
    setImageSrc('/Characters/run-left.png');
    setBgAnimation('forward');
    setCharAnimation('run');
  } else if (answer === 'B') {
    // Player chose option B, character runs to the right
    setDirection('right');
    setImageSrc('/Characters/run-right.png');
    setBgAnimation('reverse');
    setCharAnimation('run');
  }

  // Set the skeleton image and class based on the determined direction
  setSkeletonImage(
    skeletonDirection === 'right'
      ? '/Characters/attack-right.png'
      : '/Characters/attack-left.png'
  );
  setSkeletonClass(skeletonDirection); // Apply the correct class based on the skeleton's direction

  // Handle the correctness of the answer
  if (answer === correctAnswer) {
    // If the answer is correct
    setIsCorrect(true);
    setTimeout(() => {
      // Stop character and background animations
      handleStop(
        setDirection,
        setImageSrc,
        setBgAnimation,
        setCharAnimation,
        setSecondCharIn
      );
      // Move to the next question after a delay
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 0);
    }, 10000); // Adjust this delay if needed for animations
  } else {
    // If the answer is incorrect
    setIsCorrect(false);
    setSecondCharIn(true); // Trigger the skeleton to enter the scene
    setTimeout(() => {
      // Check for collision between characters before declaring the main character dead
      if (detectCollision()) {
        setIsDead(true);
        setImageSrc('/Characters/dead.png');
        setCharAnimation('dead');
        handleStop(
          setDirection,
          setImageSrc,
          setBgAnimation,
          setCharAnimation,
          setSecondCharIn
        );
      }
    }, 1500); // Ensure this matches the delay for the collision check
  }
};

export const handleStop = (
  setDirection,
  setImageSrc,
  setBgAnimation,
  setCharAnimation,
  setSecondCharIn
) => {
  // Reset the character to the idle state
  setDirection('idle');
  setImageSrc('/Characters/idle.png');
  setBgAnimation(''); // Stop any background animations
  setCharAnimation(''); // Stop any character animations
  setSecondCharIn(false); // Remove the second character from the scene
};

export const toggleMusic = (isPlaying, setIsPlaying, setIsFirstPlay) => {
  // Toggle background music on or off
  const audio = document.getElementById('background-music');
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch((error) => {
      console.log('Music playback prevented by the browser:', error);
    });
  }
  setIsPlaying(!isPlaying); // Update the playing state
  setIsFirstPlay(false); // Mark that the music has been played at least once
};

export const handleRestart = (
  setIsDead,
  setDirection,
  setImageSrc,
  setBgAnimation,
  setCharAnimation,
  setSecondCharIn,
  setIsFirstPlay,
  setIsPlaying,
  setCurrentQuestion,
  secondCharacterRef
) => {
  // Reset all character and game states for a fresh start
  setIsDead(false);
  setDirection('idle');
  setImageSrc('/Characters/idle.png');
  setBgAnimation('');
  setCharAnimation('');
  setSecondCharIn(false);
  setIsFirstPlay(true);
  setIsPlaying(false);
  setCurrentQuestion(0); // Reset to the first question

  // Stop and reset background music
  const audio = document.getElementById('background-music');
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  // Ensure that the second character’s animation is stopped
  const secondCharacter = secondCharacterRef.current;
  if (secondCharacter) {
    secondCharacter.style.animation = 'none';
    secondCharacter.offsetHeight; // Trigger reflow to reset the animation

    // Add a slight delay to ensure easing-out effect completes
    setTimeout(() => {
      secondCharacter.style.animation = ''; // Restore animation
    }, 200); // Adjust the delay as needed
  }
};
