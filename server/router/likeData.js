const express = require("express");
const router = express.Router();

const usersRouter = require("./authentication");
const Launch = require("../model/launchSchema");

// Create or remove a like
router.post("/likes", usersRouter, async (req, res) => {
  try {
    const { launchId } = req.body;
    const userId = "63f47217cacabc775a7df97f";
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
    res.status(500).send(error);
  }
});

// Create a new like
// router.post("/likes", usersRouter, async (req, res) => {
//   try {
//     const { launchId } = req.body;
//     const userId = "63f47217cacabc775a7df97f";
//     const launch = await Launch.findByIdAndUpdate(launchId, {
//       $push: {
//         likes: userId,
//       },
//     });
//     console.log({ launch });
//     res.json(launch);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

// // Delete a like
// router.delete('/likes/:id', usersRouter, async (req, res) => {
//   try {
//     const like = await Like.findOneAndDelete({
//         launchId: req.body.launchId,
//         userId: req.body.userId
//     });
//     if (!like) {
//       return res.status(404).send();
//     }
//     res.send(like);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
