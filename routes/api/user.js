const express = require('express');
const router = express.Router();

// create a user
router.post('/', async (req, res) => {
  res.send('User Route');
});

module.exports = router;
