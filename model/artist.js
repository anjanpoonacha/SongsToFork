const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'An artist must have a first name']
  },
  lastName: {
    type: String,
    required: [true, 'An artist must have a last name']
  },
  is_famous: {
    type: Boolean,
    required: [true, `It should be either 'true' or 'false'`]
  }
});

// eslint-disable-next-line new-cap
const Artist = mongoose.model('Artist', artistSchema);

module.exports = artistSchema;
module.exports = Artist;
