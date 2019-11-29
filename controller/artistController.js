const Artist = require('./../model/artist');
const catchAsync = require('./../utils/catchAsync');

exports.getAllArtists = catchAsync(async (req, res, next) => {
  const artist = await Artist.find();
  if (!artist) {
    return new Error('Cannot find artist');
  }
  res.status(200).json({
    status: 'SUCCESS',
    data: {
      artist
    }
  });
});

exports.createArtist = catchAsync(async (req, res, next) => {
  const newArtist = await Artist.create(req.body);

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      newArtist
    }
  });
});
