import React, { useState } from 'react';
import './ToggleButton.css';

const Toggel=()=>{
    const [isToggled, setIsToggled] = useState(false);

  const handleChange = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button onClick={handleChange} className={`toggle-button ${isToggled ? 'on' : 'off'}`}>
      {isToggled ? 'ON' : 'OFF'}
    </button>
  );
}
export default Toggel;