// src/components/CharacterComponent.jsx
import React, { useState } from 'react';
import './character.css'; // Adjust the path if necessary

function CharacterComponent() {
  const [direction, setDirection] = useState('face-up');

  const toggleDirection = () => {
    setDirection((prevDirection) => (prevDirection === 'right' ? 'left' : 'right'));
  };

  return (
    <div>
      <div className="Character">
        <img
          className="Character_shadow pixelart"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png"
          alt="Shadow"
        />
        <img
          id="character"
          className={`Character_spritesheet pixelart face-${direction}`}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png"
          alt="Character"
        />
      </div>
      <button onClick={toggleDirection}>Toggle Direction</button>
    </div>
  );
}

export default CharacterComponent;
