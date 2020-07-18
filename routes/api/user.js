const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// desc - create a user
// @@@ - public
router.post(
  '/',
  [
    // check the fields to ensure correct data is given
    check('email', 'A valid email is required').isEmail(),
    check('password', 'password must not be less than 6 characters').isLength({
      min: 6
    }),
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'last name is required').not().isEmpty(),
    check('role', 'Please select a trader role').not().isEmpty(),
    check('username', 'Valid username is required').not().isEmpty(),
    check('country', 'country is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // return array of errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // if no errors found
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      username,
      avatar,
      country
    } = req.body;

    try {
      // find user by the email or the username
      let user = await User.findOne({ $or: [{ email }, { username }] });

      // if user found send error message
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // create an avatar
      const avatar = gravatar.url(email, {
        r: 'pg',
        s: '200',
        d: 'mm'
      });

      // create the a instance of a user
      user = new User({
        email,
        password,
        firstName,
        lastName,
        avatar,
        username,
        role,
        country
      });

      // hash the password for security purposes

      const salt = await bcrypt.genSalt(10);

      // save the password as a hash
      user.password = await bcrypt.hash(password, salt);

      // save the user
      await user.save();

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
        { expiresIn: 650000 },
        (err, token) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error has occured, Please try again');
          }

          // send the token as the response
          if (token) {
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
