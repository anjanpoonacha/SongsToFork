const Comment = require('./../model/comment');
const Song = require('./../model/song');
const catchAsync = require('./../utils/catchAsync');

exports.checkDuplicate = catchAsync(async (req, res, next) => {
  const query = await Song.find()
    .populate('artist')
    .populate('comment');
  console.log(query[0].comments);
  next();
  // if (
  //   query.model._id === req.params.id &&
  //   query.model.comments.join(',').includes(req.body.user)
  // ) {
  //   next();
  // } else {
  //   next();
  // }
});

exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create(req.body);

  await Song.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: newComment } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      newComment
    }
  });
});
exports.getComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find()
    .populate({ path: 'song', select: 'title' })
    .populate({ path: 'user', select: 'firstName lastName' });

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      comments
    }
  });
});
