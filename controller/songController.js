const Song = require('./../model/song');
const catchAsync = require('./../utils/catchAsync');

exports.getAllSongs = catchAsync(async (req, res, next) => {
  const songs = await Song.find()
    .populate('artist')
    .populate('comment');
  res.status(200).json({
    status: 'SUCCESS',
    numSongs: songs.length,
    data: {
      songs
    }
  });
});

exports.getSong = catchAsync(async (req, res, next) => {
  const song = await Song.findById(req.params.id)
    .sort('createdAt')
    .populate('artist')
    .populate('comment');

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      song
    }
  });
});

exports.getFamous = catchAsync(async (req, res, next) => {
//   const songs = await Song.aggregate([
//     {
//       $lookup: {
//         from: 'Artist',
//         localField: '_id',
//         foreignField: '_id',
//         as: 'is_famous'
//       }
//     }
//   ]);
  const songs = await Song.find()
    .populate('artist')
    .populate('comments');
  console.log(songs);
  res.status(200).json({
    status: 'SUCCESS',
    data: {
      songs
    }
  });
});

exports.createSong = catchAsync(async (req, res, next) => {
  const newSong = await Song.create(req.body);

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      newSong
    }
  });
});
