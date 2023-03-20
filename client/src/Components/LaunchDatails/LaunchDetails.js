import React from "react";
import "./LaunchDetails.css";
import FlipClock from "../FlipClock/FlipClock";

export default function LaunchDetails() {
  return (
    <div className="launch-details-container">
      <h1 className="launch-heading">NEXT LAUNCH</h1>
      <h3 className="launch-title">Falcon 9|Crew 6</h3>
      <div className="launch-info">
        <p className="launch-location">Kennedy Space center, FL, USA</p>
        <p className="launch-time">FEBRUARY 26 12:37PM</p>
      </div>
      <FlipClock />
    </div>
  );
}
