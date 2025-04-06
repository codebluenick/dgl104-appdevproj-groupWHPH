const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email'); // select only name and email
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
