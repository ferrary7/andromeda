const mongoose = require('mongoose');

const launchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      net: {
        type: Date,
        required: true
      },
      pad: {
        name: {
          type: String,
          required: true
        },
        location: {
          name: {
            type: String,
            required: true
          },
          country_code: {
            type: String,
            required: true
          }
        }
      },
      rocket: {
        configuration: {
          name: {
            type: String,
            required: true
          },
          image_url: {
            type: String,
            required: true
          }
        }
      },
      launch_service_provider: {
        name: {
          type: String,
          required: true
        }
      },
      mission: {
        type: {
          type: String,
          required: true
        },
        mission_gallery_url: {
          type: String
        }
      },
      vidURLs: {
        type: [String]
      }
})

const Launch = mongoose.model('Launch', launchSchema);

module.exports = Launch;
