const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const Profile = require('../../models/profile');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const profile = require('../../models/profile');
const Notification = require('../../models/notification');

// get the users profile
// @@@ - protected
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ errors: [{ msg: 'Profile not found' }] });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// create a profile or edit a profile
// @@@ - protected
router.post(
  '/',
  [auth, [check('status', 'Status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      companyName,
      website,
      bio,
      youtube,
      amazon,
      instagram,
      facebook,
      twitter,
      storeLocation,
      status
    } = req.body;

    // find a user
    const user = await User.findById(req.user.id).select('-password');

    // put the data into a new object
    const profileObject = {};

    // fill up the object
    profileObject.user = req.user.id;
    profileObject.username = user.username;
    if (companyName) profileObject.companyName = companyName;
    if (website) profileObject.website = website;
    if (storeLocation) profileObject.storeLocation = storeLocation;
    if (status) profileObject.status = status;
    if (bio) profileObject.bio = bio;
    profileObject.socials = {};
    if (twitter) profileObject.socials.twitter = twitter;
    if (instagram) profileObject.socials.instagram = instagram;
    if (facebook) profileObject.socials.facebook = facebook;
    if (youtube) profileObject.socials.youtube = youtube;
    if (amazon) profileObject.socials.amazon = amazon;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // if no profile save the data as a new profile
      if (!profile) {
        profile = new Profile(profileObject);

        await profile.save();

        res.json(profile);
      }

      // if there is a profile update profile with new data
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileObject },
          { new: true }
        );

        res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// get profile by username
// @@@ - public
router.get('/:username', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      username: req.params.username
    }).populate('user', ['avatar', 'username', 'email', 'role', 'country']);

    if (!profile) {
      return res.status(404).json({ errors: [{ msg: 'Profile not found' }] });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// create address
// @@@ - protected
router.put(
  '/address',
  [
    auth,
    [
      check('type', 'Address type is required').not().isEmpty(),
      check('addressLine', 'Address is required').not().isEmpty(),
      check('city', 'City name is required').not().isEmpty(),
      check('postalCode', 'Post code is required').not().isEmpty(),
      check('state', 'state is required').not().isEmpty(),
      check('country', 'Country is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      addressLine,
      city,
      state,
      country,
      postalCode,
      additionalInfo
    } = req.body;

    // create object containing the data

    const newAddress = {
      type,
      addressLine,
      city,
      state,
      country,
      postalCode,
      additionalInfo
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // put the new address at the front
        await profile.addresses.unshift(newAddress);

        await profile.save();

        res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.send(500).send('Server Error');
    }
  }
);

// delete an address
// @@@ - protected

router.delete('/address/:addressId', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    const addressId = req.params.addressId;

    // get the index
    const removeIndex = profile.addresses
      .map((address) => address.id)
      .indexOf(addressId);

    // splice the experience from the array
    profile.addresses.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// leave feedback on a user
// @@@ - protected
router.put(
  '/feedback/:profileId',
  [auth, [check('rating', 'Rating is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, comment } = req.body;

    try {
      const userLeavingFeedback = await User.findById(req.user.id);

      // creating a new feeback object with the data
      const feedbackData = {
        user: req.user.id,
        rating,
        comment,
        avatar: userLeavingFeedback.avatar,
        username: userLeavingFeedback.username
      };

      //   find the user with the id from the url
      const profileWithFeedback = await Profile.findOne({
        _id: req.params.profileId
      });

      //   place the feedbackData in the feedback array
      await profileWithFeedback.feedback.unshift(feedbackData);

      //   notification data
      const notificationData = {
        sender: req.user.id,
        reciever: [{ user: profileWithFeedback.user }],
        type: 'feedback',
        message: `${userLeavingFeedback.username} gave you a feedback`
      };

      //   save as a new notification
      const newNotification = new Notification(notificationData);

      await profileWithFeedback.save();
      await newNotification.save();

      //   get the user you want to notify
      const userBeingNotified = await User.findById(profileWithFeedback.user);

      //   push the notification to the use you want to notify
      userBeingNotified.notifications.unshift(newNotification);

      await userBeingNotified.save();

      res.json(profileWithFeedback);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// delete a feeback
// @@@ - protected

router.delete('/feedback/:profileId/:feedbackId', auth, async (req, res) => {
  const { profileId, feedbackId } = req.params;

  try {
    let profile = await Profile.findById(profileId);

    // find the feedback
    const feedback = profile.feedback.find(
      (feedback) => feedback.id == feedbackId
    );

    // check if there is a profile
    if (!profile) {
      return res.status(404).json({ errors: [{ msg: 'Profile not found' }] });
    }

    // check if there is a feedback
    if (!feedback) {
      return res.status(404).json({ errors: [{ msg: 'Feedback not found' }] });
    }

    // check if it was the user that left the feedback
    if (feedback.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
    }

    const removeIndex = profile.feedback
      .map((fb) => fb._id)
      .indexOf(feedbackId);

    profile.feedback.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@@@ todo -  savedItems, delete account

module.exports = router;
