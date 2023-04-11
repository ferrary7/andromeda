import React from "react";
import "./NotFound.css";
import background from "../../Assets/bg.mp4";
import button from "../../Assets/Button.svg";
import cubeCrate from "../../Assets/cubeCrate.svg";
import Navbar from "../NavBar/Navbar";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="NotFound">
        <video autoPlay muted loop className="NotFound-video">
          <source src={background} type="video/mp4" />
        </video>
        <div className="over-container">
          <div className="NotFound-container">
            <div className="NotFound-text"> 404 Page Not Found</div>
            <div className="NotFound-row">
              <div className="NotFound-button-container">
                <button className="NotFound-button">
                  <Link to="/upcomingLaunches">
                    <img src={button} alt="" />
                  </Link>
                </button>
              </div>
              <div className="NotFound-text extra-text">
                Click here and Blast Off to the Future with the Latest Space
                Launches
              </div>
            </div>
            <div className="NotFound-powered-by">
              <a
                href="http://www.cubecrate.co"
                target="_blank"
                rel="noreferrer"
              >
                <img src={cubeCrate} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
