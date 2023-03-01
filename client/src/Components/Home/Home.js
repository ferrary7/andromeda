import React from 'react';
import './Home.css'
import background from '../../Assets/bg.mp4'
import button from '../../Assets/Button.svg'
import cubeCrate from '../../Assets/cubeCrate.svg'
import Navbar from '../NavBar/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
        <Navbar />
        <div className="Homepage">
          <video autoPlay muted loop className="Homepage-video">
            <source src={background} type="video/mp4" />
          </video>
          <div className="Homepage-container">
            <div className="Homepage-text">Experience the Thrill of Space Exploration with Every Launch</div>
            <div className="Homepage-row">
              <div className="Homepage-button-container">
                <button className="Homepage-button">
                  <Link to= '/upcomingLaunches'>
                    <img src={button} alt=''/>
                  </Link>
                </button>
              </div>
              <div className="Homepage-text extra-text">Click here and Blast Off to the Future with the Latest Space Launches</div>
            </div>
            <div className="Homepage-powered-by">
            <img src={cubeCrate} alt=''/>
                </div>
          </div>
        </div>
        </>
      );
}

export default Home

