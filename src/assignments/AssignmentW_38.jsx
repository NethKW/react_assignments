import React, { useState } from "react";
import map from "../scripts/map.json";
import "./AssignmentW_38.css";

function AssignmentW_38() {
  const [info, setInfo] = useState({
    latitude: "",
    longitude: "",
    accuracy: "",
    district: "",
    city: "",
    postal: "",
  });

  const distance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000;
  };

  const getLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;
        const gpsAccuracy = pos.coords.accuracy;

        let nearest = null;
        let minDist = Infinity;

        for (const district in map) {
          for (const city in map[district]) {
            const entry = map[district][city];
            const dist = distance(
              userLat,
              userLon,
              parseFloat(entry.latitude),
              parseFloat(entry.longitude)
            );

            if (dist < minDist) {
              minDist = dist;
              nearest = {
                district,
                city,
                postal: entry.code,
              };
            }
          }
        }

        setInfo({
          latitude: userLat.toFixed(7),
          longitude: userLon.toFixed(7),
          accuracy: gpsAccuracy.toFixed(2),
          district: nearest.district,
          city: nearest.city,
          postal: nearest.postal,
        });
      },
      () => alert("Location access unavailable."),
      options
    );
  };

  return (
    <div className="main asgW-38">
      <div className="location">
        <h2>Find Current Location </h2>

        <button className="locationBtn" onClick={getLocation}>
          Get My Location
        </button>

        {info.latitude && (
          <div className="locationInfo">
            <h3>Your Coordinates:</h3>
            <p><strong>Latitude:</strong> {info.latitude}</p>
            <p><strong>Longitude:</strong> {info.longitude}</p>
            <p><strong>Accuracy:</strong> ±{info.accuracy} meters</p>

            <h3>Nearest Location:</h3>
            <p><strong>District:</strong> {info.district}</p>
            <p><strong>Town:</strong> {info.city}</p>
            <p><strong>Postal Code:</strong> {info.postal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentW_38;
