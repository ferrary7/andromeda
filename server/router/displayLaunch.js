const express = require("express");
const router = express.Router();
const Launch = require("../model/launchSchema");

router.get("/upcomingLaunches", async (req, res) => {
  try {
    const upcomingLaunches = await Launch.find()
      .populate({ path: "likes" })
      .lean();
    res.json(upcomingLaunches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
