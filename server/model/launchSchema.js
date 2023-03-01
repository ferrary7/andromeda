const { Int32 } = require("bson");
const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  net: {
    type: Date,
    required: true,
  },
  pad: {
    name: {
      type: String,
      required: true,
    },
    location: {
      name: {
        type: String,
        required: true,
      },
      country_code: {
        type: String,
        required: false,
      },
      map_image: {
        type: String,
        required: true,
      },
    },
  },
  rocket: {
    configuration: {
      name: {
        type: String,
        required: false,
      },
    },
  },
  launch_service_provider: {
    name: {
      type: String,
      required: true,
    },
  },
  mission: {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
  image: {
    type: String,
    required: true,
  },
  webcast_live: {
    type: String,
    required: true,
  },
});
const Launch = mongoose.model("Launch", launchSchema);

module.exports = Launch;
