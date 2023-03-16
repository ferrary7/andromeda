const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const usersRouter = require("./authentication");
const Launch = require("../model/launchSchema");

// Create or remove a like
router.post("/likes", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { launchId } = req.body;
    const userId = decoded._id;
    const launch = await Launch.findById(launchId);
    if (!launch) {
      return res.status(404).send("Launch not found");
    }
    const userLiked = launch.likes.includes(userId);
    if (userLiked) {
      // Remove like if user already liked the launch
      const updatedLaunch = await Launch.findByIdAndUpdate(
        launchId,
        {
          $pull: {
            likes: userId,
          },
        },
        { new: true }
      );
      res.json(updatedLaunch);
    } else {
      // Add like if user has not already liked the launch
      const updatedLaunch = await Launch.findByIdAndUpdate(
        launchId,
        {
          $push: {
            likes: userId,
          },
        },
        { new: true }
      );
      res.json(updatedLaunch);
    }
  } catch (error) {
    console.log(error);
    // res.status(500).send(error);
    res.status(401).send("Unauthorized");
  }
});

module.exports = router;
