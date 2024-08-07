import { useState, useRef } from 'react';

export const useCharacterState = () => {
  // State to manage the direction the character is facing (e.g., 'idle', 'left', 'right')
  const [direction, setDirection] = useState('idle');

  // State to control the background animation (e.g., 'forward', 'reverse', '')
  const [bgAnimation, setBgAnimation] = useState('');

  // State to control the character's animation (e.g., 'run', 'idle', 'dead')
  const [charAnimation, setCharAnimation] = useState('');

  // State to track whether background music is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // State to track if it's the first time the background music is played
  const [isFirstPlay, setIsFirstPlay] = useState(true);

  // State to manage if the second character (skeleton) is entering the scene
  const [secondCharIn, setSecondCharIn] = useState(false);

  // State to manage the source image for the main character's sprite
  const [imageSrc, setImageSrc] = useState('/Characters/idle.png');

  // State to track whether the main character is dead
  const [isDead, setIsDead] = useState(false);

  // State to track the current question index in the game
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // State to track whether the answer given is correct
  const [isCorrect, setIsCorrect] = useState(false);

  // Reference to the DOM element of the main character for collision detection and manipulation
  const characterRef = useRef(null);

  // Reference to the DOM element of the second character (skeleton) for collision detection and manipulation
  const secondCharacterRef = useRef(null);

  // Return all the state variables and setters, along with the references
  return {
    direction,
    setDirection,
    bgAnimation,
    setBgAnimation,
    charAnimation,
    setCharAnimation,
    isPlaying,
    setIsPlaying,
    isFirstPlay,
    setIsFirstPlay,
    secondCharIn,
    setSecondCharIn,
    imageSrc,
    setImageSrc,
    isDead,
    setIsDead,
    currentQuestion,
    setCurrentQuestion,
    isCorrect,
    setIsCorrect,
    characterRef,
    secondCharacterRef,
  };
};
