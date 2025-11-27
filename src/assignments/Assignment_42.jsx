import React, { useState, useEffect } from "react";
import "./Assignment_42.css";

function Assignment_42() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [alpha, setAlpha] = useState(null);
  const [beta, setBeta] = useState(null);
  const [gamma, setGamma] = useState(null);

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
        } else {
          alert("Permission denied!");
        }
      } catch (error) {
        console.log("Error requesting permission:", error);
      }
    } else {
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (event) => {
      setAlpha(event.alpha?.toFixed(2));
      setBeta(event.beta?.toFixed(2));
      setGamma(event.gamma?.toFixed(2));
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [permissionGranted]);

  return (
    <div className="main asg-42">
      <h2>Device Orientation</h2>

      {!permissionGranted ? (
        <button className="enable-btn" onClick={requestPermission}>
          Enable Orientation Access
        </button>
      ) : (
        <div className="value">
          <p>Alpha: {alpha ?? "-"}</p>
          <p>Beta: {beta ?? "-"}</p>
          <p>Gamma: {gamma ?? "-"}</p>
        </div>
      )}
    </div>
  );
}

export default Assignment_42;
