const express = require('express');
const artistController = require('./../controller/artistController');

const router = express.Router();

router
  .route('/')
  .get(artistController.getAllArtists)
  .post(artistController.createArtist);

module.exports = router;
