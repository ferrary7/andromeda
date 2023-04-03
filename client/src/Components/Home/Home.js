import React, { useState, useEffect } from "react";
import "./Home.css";
import background from "../../Assets/bg.mp4";
import button from "../../Assets/Button.svg";
import cubeCrate from "../../Assets/cubeCrate.svg";
import Navbar from "../NavBar/Navbar";
import { Link } from "react-router-dom";
import LaunchDetails from "../LaunchDetails/LaunchDetails";

const Home = () => {
  const [launch, setLaunch] = useState(null);
  const [nextLaunch, setNextLaunch] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/data/upcomingLaunches`
      );
      const data = await response.json();
      setLaunch(data[0]);
      setNextLaunch(data[1]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (launch) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const launchTime = new Date(launch.net).getTime();
        const remaining = launchTime - now;
        if (remaining > 0) {
          setTimeRemaining({
            days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((remaining % (1000 * 60)) / 1000),
          });
        } else {
          setTimeRemaining(null);
          clearInterval(interval);
          setLaunch(nextLaunch);
          setNextLaunch(null);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [launch, nextLaunch]);

  return (
    <>
      <Navbar />
      <div className="Homepage">
        <video autoPlay muted loop className="Homepage-video">
          <source src={background} type="video/mp4" />
        </video>
        <div className="over-container">
          <div className="Homepage-container">
            <div className="Homepage-text">
              Experience the Thrill of Space Exploration with Every Launch
            </div>
            <div className="Homepage-row">
              <div className="Homepage-button-container">
                <button className="Homepage-button">
                  <Link to="/upcomingLaunches">
                    <img src={button} alt="" />
                  </Link>
                </button>
              </div>
              <div className="Homepage-text extra-text">
                Click here and Blast Off to the Future with the Latest Space
                Launches
              </div>
            </div>
            <div className="Homepage-powered-by">
              <a
                href="http://www.cubecrate.co"
                target="_blank"
                rel="noreferrer"
              >
                <img src={cubeCrate} alt="" />
              </a>
            </div>
          </div>
          <div className="Homepage-launch-info">
            {launch && (
              <>
                {timeRemaining ? (
                  <>
                    <LaunchDetails
                      name={launch.name}
                      location={""}
                      isLoading={false}
                      date={new Date(launch.net).toLocaleString()}
                      time={{
                        days: timeRemaining.days,
                        hours: timeRemaining.hours,
                        minutes: timeRemaining.minutes,
                        seconds: timeRemaining.seconds,
                      }}
                    />
                  </>
                ) : (
                  <LaunchDetails isLoading={true} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
