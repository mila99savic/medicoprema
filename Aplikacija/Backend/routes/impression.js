const path = require('path');

const express = require('express');

const impressionController = require('../controllers/impression');

const router = express.Router();

router.get('/all', impressionController.getImpressions)

router.post('/add', impressionController.createImpression);

router.delete('/delete/:imprId', impressionController.deleteImpression)

module.exports = router;
