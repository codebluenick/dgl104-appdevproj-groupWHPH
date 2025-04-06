// server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/users'); // ✅ This is the model

// POST route to save/update user from Google login
router.post('/', async (req, res) => {
  const { name, email, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, role });
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('❌ Failed to save user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router; // ✅ Must export the router!
