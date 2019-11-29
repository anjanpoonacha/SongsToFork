const Comment = require('./../model/comment');
const Song = require('./../model/song');
const catchAsync = require('./../utils/catchAsync');

exports.checkDuplicate = catchAsync(async (req, res, next) => {
  // const query = await Song.find();
  // console.log(query[3].comments);
  const query = await Song.aggregate([{ $unwind: '$comments' }]);
  console.log(query);

  next();
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
  const comments = await Comment.find();

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      comments
    }
  });
});
