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
      type: String,
      required: true
    },
    countryOrigin: {
      type: String
    },
    size: {
      type: String
    },
    features: {
      type: [String]
    },
    color: {
      type: String,
      required: true
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
    required: true,
    default: 1
  },
  sold: {
    type: Number,
    default: 0
  },
  format: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'OnGoing'
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
    type: Boolean,
    default: true
  },
  shippingDetails: {
    domesticShipping: {
      type: Boolean,
      default: true
    },
    internationalShipping: {
      type: Boolean,
      default: false
    },
    shippingPrice: {
      type: Number,
      required: true
    },
    nameOfService: {
      type: String
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
    },
    itemLocation: {
      type: String
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('product', productSchema);
