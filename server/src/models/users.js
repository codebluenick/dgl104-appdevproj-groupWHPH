const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'teamlead', 'teammember'],
    default: 'teammember'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
