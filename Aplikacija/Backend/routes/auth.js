
const path = require('path');
const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/registerEmployed', authController.registerEmployed)

module.exports = router;

