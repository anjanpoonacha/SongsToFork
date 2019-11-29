const User = require('./../model/user');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();
  console.log(user);
  res.status(200).json({
    status: 'SUCCESS',
    data: {
      user
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      newUser
    }
  });
});
