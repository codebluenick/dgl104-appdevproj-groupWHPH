const mongoose = require('mongoose');

// Defining mongoose schema inside the users collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'TeamLead', 'TeamMember'],
    default: 'TeamMember'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
