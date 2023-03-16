import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./LaunchSchedule.css";
import background from "../../Assets/bg.mp4";
import Navbar from "../NavBar/Navbar";
import button from "../../Assets/Button.svg";
import Loader from "../Loader/Loader";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RadarIcon from "@mui/icons-material/Radar";
import CampaignIcon from "@mui/icons-material/Campaign";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LiveTvIcon from "@mui/icons-material/LiveTv";

function LaunchSchedule() {
  const [launchSchedule, setLaunchSchedule] = useState([]);
  const [numLaunchesToShow, setNumLaunchesToShow] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/data/upcomingLaunches",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      const likedLaunches =
        JSON.parse(localStorage.getItem("likedLaunches")) || [];

      const updatedLaunchSchedule = data.map((launch) => {
        if (likedLaunches.includes(launch._id)) {
          return {
            ...launch,
            likes: [...launch.likes, jwtDecode(token)._id],
          };
        }
        return launch;
      });

      setLaunchSchedule(updatedLaunchSchedule);
      setIsLoading(false);
    };

    getData();
  }, []);

  const handleLikeClick = async (launchId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token)._id;
      const response = await fetch(`http://localhost:3000/id/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ launchId, userId }),
      });

      const likedLaunches =
        JSON.parse(localStorage.getItem("likedLaunches")) || [];
      localStorage.setItem(
        "likedLaunches",
        JSON.stringify([...likedLaunches, launchId])
      );
      const updatedLaunch = await response.json();
      setLaunchSchedule((prevLaunches) =>
        prevLaunches.map((launch) =>
          launch._id === updatedLaunch._id ? updatedLaunch : launch
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewMore = () => {
    setNumLaunchesToShow(numLaunchesToShow + 10);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="launch-schedule-container">
        <video src={background} autoPlay loop muted></video>
        <div className="launch-cards-container">
          {launchSchedule.slice(0, numLaunchesToShow).map((launch, index) => (
            <div className="launch-card" key={index}>
              <div className="launch-card-info">
                <div>
                  <h2>
                    <RocketLaunchIcon /> {launch.name}
                  </h2>
                </div>
                <div className="detailStyle">
                  <div className="left">
                    <p>
                      <RadarIcon />{" "}
                      {launch.mission ? launch.mission.name : launch.name}
                    </p>
                    <p>
                      <DateRangeIcon /> {new Date(launch.net).toLocaleString()}
                    </p>
                    <p>
                      <LocationOnIcon />
                      <a href={launch.pad.location.map_image}>
                        {" "}
                        {launch.pad.location.name},{" "}
                        {launch.pad.location.country_code}
                      </a>
                    </p>
                    {launch.rocket &&
                      launch.rocket.configuration &&
                      launch.rocket.configuration.name && (
                        <p>Rocket: {launch.rocket.configuration.name}</p>
                      )}
                    <p>
                      <SupportAgentIcon /> {launch.launch_service_provider.name}
                    </p>
                    <p>
                      <CampaignIcon />{" "}
                      {launch.mission ? launch.mission.type : "Exploration"}
                    </p>
                  </div>
                  <div className="right">
                    <p onClick={() => handleLikeClick(launch._id)}>
                      {launch.likes.includes(
                        jwtDecode(localStorage.getItem("token"))._id
                      ) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}{" "}
                      <span>Likes ({launch.likes.length})</span>
                    </p>
                    <p>
                      <ModeCommentIcon /> <span>Comment</span>
                    </p>
                    <p>
                      <AddCircleIcon /> <span>MoreInfo</span>
                    </p>
                    <p>
                      <LiveTvIcon /> <span>WatchLive</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {numLaunchesToShow < launchSchedule.length && (
            <button className="viewMore" onClick={handleViewMore}>
              <img src={button} alt="" />
              Browse More Launches
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default LaunchSchedule;
