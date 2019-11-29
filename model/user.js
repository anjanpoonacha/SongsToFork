const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A song must have a title']
  },
  lastName: {
    type: String,
    required: [true, 'A song must have a title']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
