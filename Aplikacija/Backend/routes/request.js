const express = require('express');
const requestController = require('../controllers/request');
const router = express.Router();

router.get('/all', requestController.getRequests)

router.post('/add', requestController.addRequest);

router.delete('/delete/:reqId', requestController.deleteRequest);

// router.delete('/delete', requestController.deleteResolvedRequests)

module.exports = router;