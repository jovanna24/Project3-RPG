import React, { useState, useEffect } from 'react';
import './character.css'; // Adjust the path if necessary

function CharacterComponent() {
  const [direction, setDirection] = useState('up'); // Default direction is "up"
  const [bgAnimation, setBgAnimation] = useState(''); // Default background direction
  const [isPlaying, setIsPlaying] = useState(false); // Manage music play state

  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset direction and background animation after 5 seconds
      setDirection('up');
      setBgAnimation('');
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [direction, bgAnimation]); // Dependency array ensures timer restarts on state change

  const handleDirectionChange = (charDirection, bgDirection) => {
    setDirection(charDirection);
    setBgAnimation(bgDirection);

    // Set a timeout to reset state after 5 seconds
    setTimeout(() => {
      setDirection('up');
      setBgAnimation('');
    }, 5000);
  };

  const toggleMusic = () => {
    const audio = document.getElementById('background-music');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div className={`background ${bgAnimation}`}></div>
      <div className="app-container">
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
        <div className="controls">
          <button onClick={() => handleDirectionChange('left', 'reverse')}>Option A</button>
          <button onClick={() => handleDirectionChange('right', 'forward')}>Option B</button>
          <button onClick={toggleMusic}>{isPlaying ? 'Pause Music' : 'Play Music'}</button>
        </div>
      </div>
      <audio id="background-music" src="https://www.google.com/search?q=jumanji+jungle+sounds&sca_esv=9267af3241730e66&sca_upv=1&rlz=1C1ONGR_enUS1114US1114&biw=1080&bih=1785&tbm=vid&ei=wISsZvPCJt68kPIPsZamqAE&ved=0ahUKEwjzopHl3tWHAxVeHkQIHTGLCRUQ4dUDCA4&uact=5&oq=jumanji+jungle+sounds&gs_lp=Eg1nd3Mtd2l6LXZpZGVvIhVqdW1hbmppIGp1bmdsZSBzb3VuZHMyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKABMgUQIRifBTIFECEYnwUyBRAhGJ8FMgUQIRifBTIFECEYnwUyBRAhGJ8FSM0mUL0FWO0lcAJ4AJABAJgBSqABowqqAQIyMrgBA8gBAPgBAZgCGKACyAqoAgDCAgYQABgWGB7CAgsQABiABBiGAxiKBcICCBAAGIAEGKIEwgIKEAAYgAQYQxiKBcICCxAAGIAEGJECGIoFwgIOEAAYgAQYsQMYgwEYigXCAggQABiABBixA8ICDRAAGIAEGLEDGEMYigXCAg4QABiABBiRAhixAxiKBcICCxAAGIAEGLEDGIMBwgIFEAAYgATCAggQABgWGAoYHsICCBAAGKIEGIkFmAMBiAYBkgcCMjSgB7SLAQ&sclient=gws-wiz-video#fpstate=ive&vld=cid:fb5084ff,vid:kEQ6bFE5cPs,st:0" loop />
    </div>
  );
}

export default CharacterComponent;
