const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({}, 'name email role'); // select only name and email and role
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
// GET /api/users  (NOT "/users")
router.get('/', async (req, res) => {
  try {
    // Return all users with name, email, and role
    const users = await User.find({}, 'name email role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Bulk update roles
router.put('/bulk-update', async (req, res) => {
  try {
    // Expect { users: [{ _id, role }, ...] }
    const { users } = req.body;
    
    // Loop through and update each user
    for (const usr of users) {
      await User.findByIdAndUpdate(usr._id, { role: usr.role });
    }

    res.json({ message: 'Roles updated successfully' });
  } catch (error) {
    console.error('Failed to update user roles:', error);
    res.status(500).json({ message: 'Failed to update roles' });
  }
});

// POST /api/users → create or fetch user
router.post('/', async (req, res) => {
  const { name, email, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, role });
      await user.save();
      console.log('New user created:', email);
    } else {
      console.log('User already exists:', email);
    }

    res.status(200).json({ message: 'User logged in/created', user });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
