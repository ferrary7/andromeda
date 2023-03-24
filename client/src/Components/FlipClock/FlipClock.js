import React from "react";
import "./FlipClock.css";

export default function FlipClock(props) {
  const { time } = props;
  return (
    <div className="flip-clock">
      <div className="days box">
        <div className="count">{time.days}</div>
        <div className="text">Days</div>
      </div>
      <p className="colons">:</p>
      <div className="hours box">
        <div className="count">{time.hours}</div>
        <div className="text">Hours</div>
      </div>
      <p className="colons">:</p>
      <div className="minutes box">
        <div className="count">{time.minutes}</div>
        <div className="text">Minutes</div>
      </div>
      <p className="colons">:</p>
      <div className="seconds box">
        <div className="count">{time.seconds}</div>
        <div className="text">Seconds</div>
      </div>
    </div>
  );
}
