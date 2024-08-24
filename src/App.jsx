import React from "react";
import { useState } from "react";
import { useGeolocation } from "./Custom Hooks/useGeoLocation";
import './App.css'

const App = () => {
  const [countClicks, setCountClicks] = useState(0);

  const { isLoading, position: { lat, lng }, error,getPosition } = useGeolocation();


  const handleClick = () => {
    setCountClicks((count) => count + 1);
    getPosition()
  };

  return (
    <div className="app-container">
      <button onClick={handleClick} disabled={isLoading} className="position-button">
        Get my position
      </button>

      {isLoading && <p className="loading">Loading position...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p className="position">
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
            className="map-link"
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p className="count">You requested position {countClicks} times</p>
    </div>
  );
};

export default App;
