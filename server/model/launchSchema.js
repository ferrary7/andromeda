const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  net: {
    type: Date,
    required: true,
    index: true,
  },
  pad: {
    name: {
      type: String,
      required: true,
      index: true,
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
        index: true,
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
        index: true,
      },
    },
  },
  launch_service_provider: {
    name: {
      type: String,
      required: true,
      index: true,
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
      index: true,
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
        index: true,
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
    index: true,
  },
  webcast_live: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    name: {
      type: String,
      required: false,
      index: true,
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
      index: true,
    },
  ],
  comments: {
    type: Array,
    required: false,
  },
});

const Launch = mongoose.model("Launch", launchSchema);

module.exports = Launch;
