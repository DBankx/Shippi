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
      return res.status(404).json({ msg: 'Profile not found' });
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

module.exports = router;
