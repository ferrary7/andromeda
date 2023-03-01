const express = require("express");
const router = express.Router();
const Launch = require("../model/launchSchema");
const Like = require("../model/likeSchema");

router.get("/upcomingLaunches", async (req, res) => {
  try {
    let upcomingLaunches = await Launch.find().lean();
    // res.json(upcomingLaunches);
    for (let index in upcomingLaunches) {
      const launch = upcomingLaunches[index];
      const likes = await Like.countDocuments({
        launchId: launch._id,
      }).lean();

      // console.log({ likes, type: typeof likes });
      launch.likes = likes;
      upcomingLaunches[index] = launch;
    }
    console.log(upcomingLaunches);
    res.json(upcomingLaunches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
