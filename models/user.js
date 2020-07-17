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
  companyName: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('user', userSchema);
