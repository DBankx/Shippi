const mongoose = require('mongoose');

// profile schema
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  companyName: {
    type: String
  },
  website: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  storeLocation: {
    type: String
  },
  bio: {
    type: String
  },
  feedback: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        max: 400
      },
      rating: {
        type: Number,
        max: 5,
        min: 0
      },
      avatar: {
        type: String
      },
      username: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  socials: {
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    amazon: {
      type: String
    },
    facebook: {
      type: String
    },
    youtube: {
      type: String
    }
  },
  addresses: [
    {
      type: {
        type: String,
        required: true
      },
      addressLine: {
        type: String,
        required: true
      },
      additionalInfo: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      },
      state: {
        type: String
      }
    }
  ],
  savedItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', profileSchema);
