const express = require('express');
const commentController = require('./../controller/commentController');

const router = express.Router();

router.route('/').get(commentController.getComments);
// .post(commentController.createcomment);

module.exports = router;
