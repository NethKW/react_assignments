import React, { useState, useEffect } from 'react'
import "./Assignment_17.css";

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

function componentToHex(c){
  const hex = c.toString(16);
  return hex.length == 1? "0" + hex : hex;
}
function rgbToHex(r,g,b){
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

const Assignment_17 = () => {
  const [color1, setColor1] = useState("#ffffff");
  const [color2, setColor2] = useState("#000000");
  const [mixedColor, setMixedColor] = useState("");
  
  const handleColorChange1 = (e) => {
    const newColor1 = e.target.value;
    setColor1(newColor1);
  }
  const handleColorChange2 = (e) => {
    const newColor2 = e.target.value;
    setColor2(newColor2);
  }
  const colorMix = (mix1, mix2) => {
    const [r1, g1, b1] = hexToRgb(mix1);
    const [r2, g2, b2] = hexToRgb(mix2);
    const mixR = Math.round((r1+r2)/2);
    const mixG = Math.round((g1+g2)/2);
    const mixB = Math.round((b1+b2)/2);
    const mixHex = rgbToHex(mixR,mixG,mixB);
  setMixedColor(mixHex);

  }

  useEffect(() => {
    colorMix(color1, color2);
  }, [color1, color2]);

  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const [mR,mG,mB] = hexToRgb(mixedColor);
  return (
    <div className='main asg-17'>
      <h1>Assignment #17</h1>
      <div className='color'>
        <div className='color-input'>
          <div className='color-select'>
            <label>Select First Color 1 </label>
            <input type="color" value={color1} onChange={handleColorChange1} />
          </div>

          <h3>Color Code Hex: {color1}</h3>
          <h3>Color Code RGB: ({r1}, {b1}, {g1})</h3>
        </div>
        <div className='color-input'>
          <div className='color-select'>
            <label>Select First Color 2 </label>
            <input type="color" value={color2} onChange={handleColorChange2} />
          </div>

          <h3>Color Code Hex: {color2}</h3>
          <h3>Color Code RGB: ({r2}, {b2}, {g2})</h3>
        </div>
      </div>
      <div></div>
      <div className='color-input'>
        <h2>Mixed Color</h2>
        <div className='mixed-color' style={{ backgroundColor: mixedColor}}></div>
        <h3>Color Code Hex: {mixedColor}</h3>
        <h3>Color Code RGB:({mR}, {mG}, {mB}) </h3>
      </div>
      <div className='color-input'>
        <h2>Gradient</h2>
        <div className='gradient-color' style={{ background: `linear-gradient(to right, ${color1}, ${mixedColor}, ${color2})`}}></div>
        <h3>Color Code Gradient: {color1} , {mixedColor} , {color2}</h3>
      
      </div>
    </div>
  )
}

export default Assignment_17
