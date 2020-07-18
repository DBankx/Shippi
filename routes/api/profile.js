const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const Profile = require('../../models/profile');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator/check');
const profile = require('../../models/profile');

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

//@@@ todo - address, feedback, savedItems

module.exports = router;
