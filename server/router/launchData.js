const express = require("express");
const router = express.Router();

const Launch = require("../model/launchSchema");

router.get("/launches", async (req, res) => {
  try {
    const response = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming?limit=100&format=json&offset=100"
    );
    const data = await response.json();

    const launchesToSave = data.results.map((launch) => {
      return {
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
          location: {
            name: launch.pad.location.name,
            country_code: launch.pad.location.country_code,
            map_image: launch.pad.location.map_image,
          },
        },
        mission: launch.mission && {
          name: launch.mission.name ? launch.mission.name : "NO",
          type: launch.mission.type,
        },
        image: launch.image ? launch.image : "Not found",
        webcast_live: launch.webcast_live ? launch.webcast_live : "Not Found",
      };
    });

    const savedLaunches = await Promise.all(
      launchesToSave.map((launchData) => {
        console.log(launchData);
        const newLaunch = new Launch(launchData);
        return newLaunch.save();
      })
    );

    console.log(`Saved ${savedLaunches.length} launches to the database`);

    res.json({ message: "Data inserted into MongoDB" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
