import React, { useState, useEffect } from "react";
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
  const [launches, setLaunches] = useState([]);
  const [likeCount, setLikeCount] = useState([]);
  // console.log({isLiked: launches});
  const handleLike = async (launch) => {
    console.log(launch);
    // console.log(launches);
    const res = await fetch(
      `http://localhost:3000/api/updateLike/${launch._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          likeCount: launch.likeCount + 1,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:3000/data/upcomingLaunches"
      );
      const data = await response.json();
      setLaunches([...data]);
      setIsLoading(false);
    };

    getData();
  }, []);

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
          {launches.map((launch, index) => (
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
                    {/* <p>Image: <img src={launch.image} alt="" className="capture"></img></p> */}
                    <p>
                      <LocationOnIcon />
                      <a href={launch.pad.location.map_image}>
                        {" "}
                        {launch.pad.location.name},{" "}
                        {launch.pad.location.country_code}
                      </a>
                    </p>
                    {/* <p>
                  Map: {launch.pad.location.map_image}
                </p> */}
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
                    <p onClick={() => handleLike(launch)}>
                      {launch.likeCount ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}{" "}
                      <span>Like</span>
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
