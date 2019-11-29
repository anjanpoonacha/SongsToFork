const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is mandatory']
  },
  lastName: {
    type: String,
    required: [true, 'lastname is mandatory']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
