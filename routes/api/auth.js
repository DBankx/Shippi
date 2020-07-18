require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// desc - get the user data
// @@@ - protected
router.get('/', auth, async (req, res) => {
  try {
    // find the user by the id without displaying the password
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      res.status(404).json({ msg: 'user not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// desc - login a user
// @@@ - public
router.post(
  '/',
  [
    // check the fields to ensure correct data is given
    check('email', 'A valid email is required').isEmail(),
    check('password', 'A valid password is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // return array of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // if no errors found
    const { email, password } = req.body;

    try {
      // find user by the email
      let user = await User.findOne({ email: email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentails' }] });
      }

      // match the passwords using bcrypt
      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentails' }] });
      }

      // create a payload for jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      // get a token from jwt
      // @@ todo reduce the expires in time before prod
      await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 65000 },
        (err, token) => {
          if (err) {
            console.log(err);
          } else {
            // send a token as the response
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
