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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'A song must have a title']
  },
  album_name: {
    type: String,
    default: 'Album1'
  },
  genre: {
    type: String,
    default: 'Classical'
  }
});

songSchema.pre(/^find/, function(next) {
  this.populate('comments');
  next();
});

// eslint-disable-next-line new-cap
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
