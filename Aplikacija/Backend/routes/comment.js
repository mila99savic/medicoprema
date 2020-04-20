const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/add', commentController.addComment);

module.exports = router;