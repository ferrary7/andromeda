const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../model/userSchema");

router.post("/signup", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = new User({ name, email, password, confirmPassword });
  user.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Error signing up" });
    } else {
      res.status(200).json({ error: false, message: "Signed up successfully" });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      console.log(user);
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      console.log(token);
      res.json({ name: user.name, token: token });
    } else {
      res.status(422).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong. Please try again.");
  }
});

module.exports = router;
