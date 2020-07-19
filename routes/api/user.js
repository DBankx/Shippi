const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/auth');
const { options } = require('./profile');
const Notification = require('../../models/notification');

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

// desc - edit & update user data
// @@@ - protected
router.patch(
  '/',
  [
    auth,
    [
      check('email', 'valid email is required').isEmail(),
      check('username', 'valid username is required').not().isEmpty(),
      check('role', 'Please select a trader role').not().isEmpty(),
      check('country', 'Country name is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(400).json({ errors: errors.array() });
    }

    const { email, username, role, country } = req.body;
    try {
      // find the user by the data from the token
      let user = await User.findOne({ _id: req.user.id });

      if (!user) {
        return res.status(404).json({ msg: 'user not found' });
      }

      if (user) {
        // create a new object with changes you want to make and static changes
        let newChanges = {
          email,
          username,
          role,
          country,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar
        };

        // update the db with the object above
        user = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: newChanges },
          { new: true }
        );

        // respond with the new user data
        res.json(user);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// view all notifications
// @@@ - protected
router.get('/notifications', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).populate('notifications', [
      'sender',
      'reciever',
      'type',
      'message',
      'isRead, readAt',
      'createdAt'
    ]);

    let allNotifications = user.notifications;

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// read a notification
// @@@ - protected
router.patch('/notifications/:notificationId', auth, async (req, res) => {
  try {
    let notification = await Notification.findById(req.params.notificationId);

    // check if notification is being viewed by the user

    if (notification.reciever.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
    }

    // set the isRead value to true
    notification.isRead = true;
    notification.save();

    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// delete a notification
// @@@ - protected
router.delete('/notifications/:notificationId', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let notification = await Notification.findById(req.params.notificationId);
    let mainNotification = await Notification.findOne({
      _id: req.params.notificationId
    });

    // check if notification is being viewed by the user
    if (notification.reciever.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
    }

    // get the index
    const removeIndex = user.notifications
      .map((notify) => notify.id)
      .indexOf(req.params.notificationId);

    // splice the experience from the array
    user.notifications.splice(removeIndex, 1);

    //  delete the notification entirely
    await mainNotification.remove();

    await user.save();

    res.json(user.notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
