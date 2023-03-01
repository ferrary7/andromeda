const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  launchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Launch",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
