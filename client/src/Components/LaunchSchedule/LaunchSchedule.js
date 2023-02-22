import React, { useState, useEffect } from "react";
import "./LaunchSchedule.css";
import background from '../../Assets/bg.mp4'
import Navbar from "../NavBar/Navbar";
import button from '../../Assets/Button.svg'
import Loader from "../Loader/Loader";

function LaunchSchedule() {
  const [launchSchedule, setLaunchSchedule] = useState([]);
  const [numLaunchesToShow, setNumLaunchesToShow] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const API =
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=200&format=json";
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setLaunchSchedule(data.results);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleViewMore = () => {
    setNumLaunchesToShow(numLaunchesToShow + 10);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (<>
  <Navbar />
    <div className="launch-schedule-container">
      <video src={background} autoPlay loop muted></video>
      <div className="launch-cards-container">
        {launchSchedule.slice(0, numLaunchesToShow).map((launch) => (
          <div className="launch-card" key={launch.id}>
            <div className="launch-card-info">
              <h2>{launch.name}</h2>
              <p>Net Launch Date: {launch.net}</p>
              <p>
                Pad Location: {launch.pad.location.name},{" "}
                {launch.pad.location.country_code}
              </p>
              <p>Rocket: {launch.rocket.configuration.name}</p>
              <p>Launch Agency: {launch.launch_service_provider.name}</p>
              <p>
                Mission Type: {launch.mission ? launch.mission.type : "Unknown"}
              </p>
            </div>

            {launch.vidURLs && launch.vidURLs.length > 0 && (
              <div className="launch-card-video">
                <h3>Live Video</h3>
                <iframe
                  src={launch.vidURLs[0]}
                  width="560"
                  height="315"
                  title="Live Video"
                ></iframe>
              </div>
            )}

            {launch.rocket.configuration.image_url && (
              <div className="launch-card-logo">
                <h3>Logo</h3>
                <img
                  src={launch.rocket.configuration.image_url}
                  alt="Rocket Logo"
                />
              </div>
            )}

            {launch.mission && launch.mission.mission_gallery_url && (
              <div className="launch-card-gallery">
                <h3>Gallery</h3>
                <img
                  src={launch.mission.mission_gallery_url}
                  alt="Mission Gallery"
                />
              </div>
            )}
          </div>
        ))}
      {numLaunchesToShow < launchSchedule.length && (
        <button className="launch-card viewMore" onClick={handleViewMore} ><img src={button} alt=''/>Browse More Launches</button>
      )}
      </div>
    </div>
      </>
  );
}

export default LaunchSchedule;
