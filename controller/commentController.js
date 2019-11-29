const Comment = require('./../model/comment');
const Song = require('./../model/song');
const catchAsync = require('./../utils/catchAsync');

exports.checkDuplicate = catchAsync(async (req, res, next) => {
  const query = await Comment.find();
  const { songId } = req.params;
  const userId = req.body.user;

  // eslint-disable-next-line eqeqeq
  const dup = query.find(el => el.user._id == userId && el.song == songId);
  if (dup) next(new Error('A user can comment only once'));
  next();
});

exports.createComment = catchAsync(async (req, res, next) => {
  req.body.song = req.params.songId;
  const newComment = await Comment.create(req.body);

  const query = await Song.findOneAndUpdate(
    { _id: req.params.songId },
    { $push: { comments: newComment } },
    { runValidators: true, new: true }
  );

  if (query) {
    res.status(200).json({
      status: 'SUCCESS',
      data: {
        newComment
      }
    });
  }
});

exports.getComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      comments
    }
  });
});
