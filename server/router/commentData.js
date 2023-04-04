const express = require("express");
const router = express.Router();
const Launch = require("../model/launchSchema");

router.get("/get-comments/:id", async (req, res) => {
  try {
    const comments = await Launch.findOne({ _id: req.params.id });
    console.log(comments);
    res.json(comments.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/add-comment", async (req, res) => {
  const { message, id, userName } = req.body;
  try {
    const launch = await Launch.findOne({ _id: id });
    const comments = launch.comments;
    comments.push({
      userName: userName,
      message: message,
    });
    launch.comments = comments;
    await launch.save();
    res.status(201).json({ message: "Comment added successfully." });
  } catch (err) {
    res.status(500).json({
      error: "An error occured, please try again later. \n Error:",
      err,
    });
  }
});

module.exports = router;
