const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/users', userController.getUsers);

router.get('/findById/:userId', userController.getUserById);

router.get('/getAllEmployed', userController.getAllEmployed);

router.get('/find/:userEmail', userController.findByEmail)

router.put('/edit/:userId', userController.updateUser);

router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;