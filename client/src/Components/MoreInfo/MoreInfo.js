import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>Launch Details</h1>
      <p>{launch.name}</p>
      <p>{launch.net}</p>
      <p>{launch.mission ? launch.mission.name : launch.name}</p>
      <p>
        {launch.launch_service_provider
          ? launch.launch_service_provider.name
          : "Checking..."}
      </p>
      <p>
        {launch.launch_service_provider
          ? launch.launch_service_provider.type
          : "Checking..."}
      </p>
      <p>{launch.pad ? launch.pad.latitude : "Checking..."}</p>
      <p>{launch.pad ? launch.pad.longitude : "Checking..."}</p>
      <p>
        {launch.mission
          ? launch.mission.description
          : "Will be updated shortly"}
      </p>
      <p>
        {launch.mission ? launch.mission.orbit.name : "Will be updated shortly"}
        ({launch.mission ? launch.mission.orbit.abbrev : ""})
      </p>
      <p>
        {launch.status ? launch.status.name : "Will be updated shortly"}
        {launch.status ? launch.status.description : ""}
      </p>
    </div>
  );
};

export default MoreInfo;
