import React from "react";
import "./FlipClock.css";

export default function FlipClock() {
  var countDownDate = new Date("May 13, 2023 00:00:00").getTime();

  // Update the countdown every second
  var countdownInterval = setInterval(function () {
    // Get the current date and time
    var now = new Date().getTime();

    // Calculate the distance between now and the countdown date
    var distance = countDownDate - now;

    // Calculate days, hours, minutes, and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown in the element with id="countdown"
    document.querySelector(".days .count").innerText = days;
    document.querySelector(".hours .count").innerText = hours;
    document.querySelector(".minutes .count").innerText = minutes;
    document.querySelector(".seconds .count").innerText = seconds;

    // If the countdown is finished, stop updating the countdown
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.querySelector(".flip-clock").innerHTML = "LAUNCHED";
    }
  }, 1000);
  return (
    <div className="flip-clock">
      <div className="days box">
        <div className="count">10</div>
        <div className="text">Days</div>
      </div>
      <p className="colons">:</p>
      <div className="hours box">
        <div className="count">10</div>
        <div className="text">Hours</div>
      </div>
      <p className="colons">:</p>
      <div className="minutes box">
        <div className="count">10</div>
        <div className="text">Minutes</div>
      </div>
      <p className="colons">:</p>
      <div className="seconds box">
        <div className="count">10</div>
        <div className="text">Seconds</div>
      </div>
    </div>
  );
}
