const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A song must have an artist']
  },
  createdAt: {
    type: Date,
    default: new Date().toUTCString()
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'A song must have an artist']
  },
  album_name: {
    type: String,
    default: 'Album1'
  },
  genre: {
    type: String,
    default: 'Classical'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

songSchema.pre(/^find/, function(next) {
  this.populate('comments').populate('user');
  next();
});

// eslint-disable-next-line new-cap
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
