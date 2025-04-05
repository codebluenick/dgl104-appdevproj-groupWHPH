const User = require('../models/userModel');

async function handleLogin(req, res) {
  const { name, email } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    // If not, create user with default or assigned role
    if (!user) {
      // You can assign roles manually or based on email logic
      const role = (email === 'admin@example.com') ? 'admin' :
                   (email === 'teamlead@example.com') ? 'teamlead' : 'teammember';

      user = new User({ name, email, role });
      await user.save();
    }

    // Store basic user info in session or JWT or send to frontend
    return res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    return res.status(500).json({ message: 'Server error during login' });
  }
}
