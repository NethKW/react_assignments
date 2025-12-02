import React, { useEffect, useRef, useState } from 'react'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import "./Assignment_43.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';

function Assignment_43() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [gamma, setGamma] = useState(null);
  const boxRef = useRef(null);
  const blueRef = useRef(null);
  const [snow, setSnow] = useState([]);

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const response = await DeviceOrientationEvent.requestPermission();
      if (response === "granted") {
        setPermissionGranted(true);
      }
      else {
        alert("permission denied");
      }
    }
    else {
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (event) => {
      setGamma(event.gamma);
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [permissionGranted]);

  useEffect(() => {
    const dropBox = setInterval(() => {
      setSnow((prev) => {
        if (prev.length >=5) return prev;
        return [
        ...prev,
        {
          id: Date.now(),
          x: Math.random()*400,
          y:0
        }
      ]});
    }, 2600);

    return () => clearInterval(dropBox);
  },[permissionGranted]);

  useEffect(() =>{
    const loop = setInterval(() => {
      setSnow((prev) =>
      prev.map((r) => ({...r, y: r.y +5})).filter((r) => r.y < 500))
    }, 70); 

    return () => clearInterval(loop);
  }, []);

  useEffect(()=>{
    if (!permissionGranted || !blueRef.current || !boxRef.current) return;
    const boxWidth = boxRef.current.offsetWidth;
    const blueBoxWidth = blueRef.current.offsetWidth;

    let posX = ((gamma + 45) / 90) * (boxWidth -blueBoxWidth);
    posX = Math.max(0,Math.min(posX,boxWidth -blueBoxWidth));

    blueRef.current.style.left=posX + "px";
  },[gamma, permissionGranted]);

  return (
    <div className='main asg-43'>
      {!permissionGranted ? (
        <button className='enable' onClick={requestPermission}><PlayCircleFilledWhiteOutlinedIcon /></button>
      ) : (
        <div className='box' ref={boxRef}>
          <div className='blueBox' ref={blueRef}></div>
          {snow.map(r =>(
            <AcUnitIcon 
            key={r.id}
            className='snow'
            style={{left: r.x, top:r.y}}/>
          ))}
          
        </div>
      )}
    </div>
  )
}

export default Assignment_43
