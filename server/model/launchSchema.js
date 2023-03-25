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
    latitude: {
      type: String,
      required: false,
    },
    longitude: {
      type: String,
      required: false,
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
      total_launch_count: {
        type: Number,
        required: false,
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
    type: {
      type: String,
      required: false,
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
    description: {
      type: String,
      required: false,
    },
    orbit: {
      name: {
        type: String,
        required: false,
      },
      abbrev: {
        type: String,
        required: false,
      },
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
  status: {
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const Launch = mongoose.model("Launch", launchSchema);

module.exports = Launch;
