// src/controllers/authController.js
const User = require('../models/userModel');

const handleLogin = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    // If not, create the user and assign a role
    if (!user) {
      const role = (email === 'admin@example.com') ? 'admin' :
                   (email === 'teamlead@example.com') ? 'teamlead' : 'teammember';

      user = new User({ name, email, role });
      await user.save();
    }

    // Respond with user info (optionally include token in real app)
    res.status(200).json({
      message: 'User logged in successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { handleLogin };
