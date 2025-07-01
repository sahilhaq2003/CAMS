const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['Admin', 'Police Officer', 'Investigator', 'Reporter'],
    default: 'Reporter'
  },
  profileImage: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('User', userSchema);
