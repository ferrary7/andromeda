const express = require("express");
const router = express.Router();

const Launch = require("../model/launchSchema");

router.get("/api/launches", async (req, res) => {
  try {
    const response = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=200&format=json"
    );
    const data = await response.json();

    for (const launch of data.results) {
      const newLaunch = new Launch({
        name: launch.name,
        net: new Date(launch.net),
        rocket: {
          name: launch.rocket.configuration.name,
        },
        launch_service_provider: {
          name: launch.launch_service_provider.name,
        },
        pad: {
          name: launch.pad.name,
          latitude: launch.pad.latitude,
          longitude: launch.pad.longitude,
          location: {
            name: launch.pad.location.name,
            country_code: launch.pad.location.country_code,
          },
        },
        mission: launch.mission && {
          name: launch.mission.name,
          description: launch.mission.description,
          orbit: launch.mission.orbit && {
            name: launch.mission.orbit.name,
          },
        },
      });

      await newLaunch.save();
    }

    res.json({ message: "Data inserted into MongoDB" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
