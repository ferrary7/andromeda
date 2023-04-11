import React from "react";
import "./About.css";
import background from "../../Assets/bg.mp4";
import button from "../../Assets/Button.svg";
import cubeCrate from "../../Assets/cubeCrate.svg";
import Navbar from "../NavBar/Navbar";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="About">
        <video autoPlay muted loop className="About-video">
          <source src={background} type="video/mp4" />
        </video>
        <div className="over-container">
          <div className="About-container">
            <div className="About-text">
              <span className="About-header">Welcome</span> to Aryan's Capstone!
              <br />
              Andromeda is a website for space enthusiasts who believe that
              space exploration has the potential to improve the world in
              countless ways. Andromeda aims to inspire the new generation of
              space enthusiasts, foster international cooperation, and raise
              awareness of important global issues.
              <br />
              <br />
              At Andromeda, we strive to create a community of space enthusiasts
              who share the vision of a better world through scientific research
              and exploration. I am committed to providing a platform that is
              accessible, informative, and engaging, and always looking for ways
              to improve Andromeda and better serve the users.
              <br />
              <br />
              Thank you for visiting us, and we hope that you will join us in
              our mission to improve the world through space exploration!
            </div>
            <div className="About-row">
              <div className="About-button-container">
                <button className="About-button">
                  <Link to="/upcomingLaunches">
                    <img src={button} alt="" />
                  </Link>
                </button>
              </div>
              <div className="About-text extra-text">
                Click here and Blast Off to the Future with the Latest Space
                Launches
              </div>
            </div>
            <div className="About-powered-by">
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

export default About;
