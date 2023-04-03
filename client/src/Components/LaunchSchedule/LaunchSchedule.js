import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./LaunchSchedule.css";
import background from "../../Assets/bg.mp4";
import Navbar from "../NavBar/Navbar";
import button from "../../Assets/Button.svg";
// import profile from "../../Assets/profile.png";
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
import AddCircleIcon from "@mui/icons-material/Info";
import CloseIcon from "@material-ui/icons/Close";
import LaunchIcon from "@mui/icons-material/Launch";

function LaunchSchedule() {
  const [launchSchedule, setLaunchSchedule] = useState([]);
  const [numLaunchesToShow, setNumLaunchesToShow] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const [commentId, setCommentId] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/data/upcomingLaunches`
      );
      const data = await response.json();
      console.log(data);

      setLaunchSchedule(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  const handleLikeClick = async (launchId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect user to login page
        window.location.href = "/users/login";
        return;
      }

      const userId = jwtDecode(token)._id;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/id/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ launchId, userId }),
        }
      );

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
      console.error("error ", error);
    }
  };

  const handleViewMore = () => {
    setNumLaunchesToShow(numLaunchesToShow + 10);
  };

  if (isLoading) {
    return <Loader />;
  }

  const getComments = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/data/get-comments/${id}`
      );
      const data = await res.json();
      if (data.status === 422 || data.status === 500) {
        alert(data.error);
        return data.error;
      } else {
        setComments(data);
      }
    } catch (err) {
      console.log("An error occured: " + err);
    }
  };

  const handleCommentClick = (id) => {
    setCommentId(id);
    getComments(id);
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setComments(null);
    setCommentId(null);
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/users/signup";
        return;
      }

      if (commentMessage.trim() === "") {
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/data/add-comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: commentId,
            userName: localStorage.getItem("userName"),
            message: commentMessage,
          }),
        }
      );
      const data = await res.json();
      if (data.status === 422 || data.status === 500) {
        alert(data.error);
        return data.error;
      } else {
        setCommentMessage("");
        getComments(commentId);
      }
    } catch (err) {
      console.log("An error occured: " + err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="launch-schedule-container">
        <video src={background} autoPlay loop muted></video>
        <div className="launch-main">
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
                        <DateRangeIcon />{" "}
                        {new Date(launch.net).toLocaleString()}
                      </p>
                      <p>
                        <LocationOnIcon /> {launch.pad.location.name},
                        {launch.pad.location.country_code}
                        <a
                          href={launch.pad.location.map_image}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          <LaunchIcon style={{ fontSize: "18px" }} />
                        </a>
                      </p>
                      {launch.rocket &&
                        launch.rocket.configuration &&
                        launch.rocket.configuration.name && (
                          <p>Rocket: {launch.rocket.configuration.name}</p>
                        )}
                      <p>
                        <SupportAgentIcon />{" "}
                        {launch.launch_service_provider.name}
                      </p>
                      <p>
                        <CampaignIcon />{" "}
                        {launch.mission ? launch.mission.type : "Exploration"}
                      </p>
                    </div>
                    <div className="right">
                      <p
                        onClick={() => handleLikeClick(launch._id)}
                        className="likeBox"
                      >
                        {localStorage.getItem("token") ? (
                          <>
                            {launch.likes.includes(
                              jwtDecode(localStorage.getItem("token"))._id
                            ) ? (
                              <FavoriteIcon />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                            <span>Likes ({launch.likes.length})</span>
                            <div className="likes">({launch.likes.length})</div>
                          </>
                        ) : (
                          <>
                            <FavoriteBorderIcon />
                            <span>Likes ({launch.likes.length})</span>
                            <div className="likes"></div>
                          </>
                        )}
                      </p>

                      {/* {console.log(launch._id)} */}
                      <p onClick={() => handleCommentClick(launch._id)}>
                        <ModeCommentIcon /> <span>Comment</span>
                      </p>
                      <Link to={`/launches/${launch._id}`}>
                        <p>
                          <AddCircleIcon /> <span>MoreInfo</span>
                        </p>
                      </Link>
                      {/* <p>
                        <LiveTvIcon /> <span>WatchLive</span>
                      </p> */}
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
          {showCommentModal && comments && (
            <div className="comment-modal">
              <div className="modal-content">
                <CloseIcon
                  className="close-icon"
                  onClick={handleCloseCommentModal}
                />
                <form onSubmit={commentHandler} className="comment-form">
                  <h1 className="comments-h1">Comments ({comments.length})</h1>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      className="comment-input"
                      value={commentMessage}
                      placeholder="Join the discussion here..."
                      onChange={(e) => setCommentMessage(e.target.value)}
                    />
                    <button type="submit" className="comment-submit">
                      Submit
                    </button>
                  </div>
                </form>
                <div className="comments-container">
                  {comments.map((e, i) => {
                    return (
                      e.message && (
                        <div className="comment-box" key={i}>
                          <h3 className="comment-name">
                            <img
                              src={button}
                              alt=""
                              className="comment-photo"
                            />{" "}
                            {e.userName}
                          </h3>
                          <p className="comment-message">{e.message}</p>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LaunchSchedule;
