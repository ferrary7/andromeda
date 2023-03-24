const express = require("express");
const { default: mongoose } = require("mongoose");
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

router.get("/launches/:launchId", async (req, res) => {
  try {
    const launchId = req.params.launchId;

    const moreInfo = await Launch.findOne({
      _id: launchId,
    });
    res.json(moreInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
