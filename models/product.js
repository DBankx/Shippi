const mongoose = require('mongoose');

// product schema
const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  productImages: {
    type: [String],
    required: true
  },
  details: {
    modelNumber: {
      type: String
    },
    releaseDate: {
      type: Date
    },
    brandName: {
      type: String
    },
    countryOrigin: {
      type: String
    },
    Size: {
      type: String
    },
    features: {
      type: [String]
    },
    color: {
      type: String
    }
  },
  category: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  watchers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  feedback: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      comment: {
        type: String,
        max: 400
      },
      rating: {
        type: Number,
        max: 5,
        min: 0,
        required: true
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
  returns: {
    type: Boolean
  },
  shippingDetails: {
    domesticShipping: {
      type: Boolean
    },
    internationalShipping: {
      type: Boolean
    },
    shippingPrice: {
      type: Number,
      required: true
    },
    weight: {
      type: Number
    },
    height: {
      type: Number
    },
    width: {
      type: Number
    },
    depth: {
      type: Number
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('product', productSchema);
