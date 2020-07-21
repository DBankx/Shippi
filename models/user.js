const mongoose = require('mongoose');

// Schema for user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'notification'
    }
  ],
  watching: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      }
    }
  ],
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      },
      price: {
        type: Number,
        default: 0
      },
      quantity: {
        type: Number,
        default: 1
      },
      shippingPrice: {
        type: Number,
        default: 0
      }
    }
  ],
  orders: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      },
      timeBought: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = User = mongoose.model('user', userSchema);
