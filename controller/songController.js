const Song = require('./../model/song');
const catchAsync = require('./../utils/catchAsync');

exports.getAllSongs = catchAsync(async (req, res, next) => {
  const songs = await Song.find();

  res.status(200).json({
    status: 'SUCCESS',
    numSongs: songs.length,
    data: {
      songs
    }
  });
});

exports.getSong = catchAsync(async (req, res, next) => {
  const song = await Song.findById(req.params.songId)
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

exports.createSong = catchAsync(async (req, res, next) => {
  const newSong = await Song.create(req.body);

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      newSong
    }
  });
});

exports.getFamous = catchAsync(async (req, res, next) => {
  const songs = await Song.find().populate('artist');

  const famousSongs = songs.filter(el => el.artist.is_famous === true);
  console.log(famousSongs);
  res.status(200).json({
    status: 'SUCCESS',
    numResult: famousSongs.length,
    data: {
      famousSongs
    }
  });
});
