import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import background from "../../Assets/bg.mp4";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RadarIcon from "@mui/icons-material/Radar";
import CampaignIcon from "@mui/icons-material/Campaign";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import DescriptionIcon from "@mui/icons-material/Description";
import LaunchIcon from "@mui/icons-material/Launch";
import "./MoreInfo.css";
import spaceAgencies from "../data";

const MoreInfo = () => {
  const { launchId } = useParams();
  const [launch, setLaunch] = useState({});

  useEffect(() => {
    const fetchLaunchDetails = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/data/launches/${launchId}`
      );
      const data = await response.json();
      setLaunch(data);
    };
    fetchLaunchDetails();
  }, [launchId]);

  return (
    <>
      <Navbar />
      <div>
        <video
          className="background-video"
          autoPlay
          loop
          muted
          src={background}
        />
        <div className="more-info">
          <h1>
            <RocketLaunchIcon style={{ fontSize: "40px" }} />{" "}
            {launch ? launch.name : "Checking..."}{" "}
            {launch.launch_service_provider && (
              <>
                <img
                  className="agency-logo"
                  src={
                    launch.launch_service_provider.name in spaceAgencies
                      ? spaceAgencies[launch.launch_service_provider.name]
                      : ""
                  }
                  alt={`${launch.launch_service_provider?.name} logo`}
                />
              </>
            )}
          </h1>
          <div className="details-container">
            <div className="details">
              <p>
                <DateRangeIcon /> Date and Time of Launch:{" "}
                {new Date(
                  launch ? launch.net : "To be Declared"
                ).toLocaleString()}
              </p>
              <p>
                <RadarIcon /> Launch Mission Name:{" "}
                {launch.mission ? launch.mission.name : launch.name}
              </p>
              <p className="agency">
                <SupportAgentIcon /> Space Agency:{" "}
                {launch.launch_service_provider
                  ? launch.launch_service_provider.name
                  : "Checking..."}
              </p>

              <p>
                <CampaignIcon /> Launch Mission Type:{" "}
                {launch.mission ? launch.mission.type : "Exploration"}
              </p>
              <div className="location">
                <p>
                  <LocationOnIcon /> Launch Location:{" "}
                  {launch.pad ? launch.pad.location.name : "Checking..."}{" "}
                  <a
                    href={launch.pad ? launch.pad.location.map_image : ""}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LaunchIcon style={{ fontSize: "18px", color: "white" }} />
                  </a>
                </p>
                <p style={{ paddingLeft: "3rem" }}>
                  <SubdirectoryArrowRightIcon /> Latitude:{" "}
                  {launch.pad ? launch.pad.latitude : "Checking..."}
                </p>
                <p style={{ paddingLeft: "3rem" }}>
                  <SubdirectoryArrowRightIcon /> Longitude:{" "}
                  {launch.pad ? launch.pad.longitude : "Checking..."}
                </p>
              </div>
              <p className="more-info-description">
                <DescriptionIcon />
                <p style={{ textAlign: "left" }}>
                  Launch Description:
                  {<br />}
                  {<br />}
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <SubdirectoryArrowRightIcon />
                    {launch.mission
                      ? launch.mission.description
                      : "Will be updated shortly"}
                  </div>
                </p>
              </p>
              <p>
                Launch Orbit name:{" "}
                {launch.mission
                  ? launch.mission.orbit.name
                  : "Will be updated shortly"}{" "}
                ({launch.mission ? launch.mission.orbit.abbrev : ""})
              </p>
              <p>
                Launch Status:{" "}
                {launch.status ? launch.status.name : "Will be updated shortly"}
                {launch.status ? launch.status.description : ""}
              </p>
              <img className="more-info-image" src={launch.image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
