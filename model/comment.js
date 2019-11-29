const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment should have the name of a user']
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: [true, 'Comment should contain the name of the song']
  },
  detail: {
    type: String,
    required: [true, 'Comment cannot be null']
  }
});

commentSchema.pre(/^find/, function(next) {
  this.populate('user');
  next();
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
