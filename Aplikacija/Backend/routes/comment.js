const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.get('/all', commentController.getComments)

router.post('/add', commentController.addComment);

router.delete('/delete/:commId', commentController.deleteComment)

module.exports = router;