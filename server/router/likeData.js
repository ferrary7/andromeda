const express = require("express");
const router = express.Router();

const usersRouter = require("./authentication");
const Like = require("../model/likeSchema");

// Create a new like
router.post("/likes", usersRouter, async (req, res) => {
  try {
    console.log(req.body);
    const likeItem = await Like.findOne({
      launchId: req.body.launchId,
      userId: "63f4728ccacabc775a7df985",
    });
    if (!likeItem) {
      console.log({ likeItem });
      const like = new Like({
        launchId: req.body.launchId,
        userId: req.body.userId,
      });
      await like.save();
    } else {
      const like = await Like.findOneAndDelete({
        launchId: req.body.launchId,
        userId: "63f4728ccacabc775a7df985",
      });
      console.log({ like });
    }

    // launchCard.likes = (launchCard.likes || 0) + 1;
    // await launchCard.save();

    // res.send({like, launchCard});
    res.json({ mssg: "Suc" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

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
