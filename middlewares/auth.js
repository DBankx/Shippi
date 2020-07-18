require('dotenv').config();
const jwt = require('jsonwebtoken');

// desc - function to protect a route
module.exports = function (req, res, next) {
  // get the token from the header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(400).json({ msg: 'Token needed for authorization' });
  }

  try {
    // decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'invalid token' });
  }
};
