const express = require('express');
const songController = require('./../controller/songController');
const commentController = require('./../controller/commentController');

const router = express.Router();

router.route('/famous-artist').get(songController.getFamous);
router
  .route('/')
  .get(songController.getAllSongs)
  .post(songController.createSong);

router
  .route('/:songId')
  .get(songController.getSong)
  .post(commentController.checkDuplicate, commentController.createComment);

module.exports = router;
