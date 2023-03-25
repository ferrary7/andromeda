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

const MoreInfo = () => {
  const { launchId } = useParams();
  const [launch, setLaunch] = useState({});

  useEffect(() => {
    const fetchLaunchDetails = async () => {
      const response = await fetch(
        `http://localhost:3000/data/launches/${launchId}`
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
        <video src={background} autoPlay loop muted></video>
        <div>
          <h1>Launch Details</h1>
          <h2>
            <RocketLaunchIcon /> {launch.name}
          </h2>
          <p>
            <DateRangeIcon /> {new Date(launch.net).toLocaleString()}
          </p>
          <p>
            <RadarIcon /> {launch.mission ? launch.mission.name : launch.name}
          </p>
          <p>
            <SupportAgentIcon />{" "}
            {launch.launch_service_provider
              ? launch.launch_service_provider.name
              : "Checking..."}
          </p>
          <p>
            <CampaignIcon />{" "}
            {launch.mission ? launch.mission.type : "Exploration"}
          </p>
          <p>{launch.pad ? launch.pad.latitude : "Checking..."}</p>
          <p>{launch.pad ? launch.pad.longitude : "Checking..."}</p>
          <p>
            {launch.mission
              ? launch.mission.description
              : "Will be updated shortly"}
          </p>
          <LocationOnIcon />
          <p>
            {launch.mission
              ? launch.mission.orbit.name
              : "Will be updated shortly"}
            ({launch.mission ? launch.mission.orbit.abbrev : ""})
          </p>
          <p>
            {launch.status ? launch.status.name : "Will be updated shortly"}
            {launch.status ? launch.status.description : ""}
          </p>
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
