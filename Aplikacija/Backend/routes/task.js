const express = require('express');
const taskController = require('../controllers/task');
const router = express.Router();

router.get('/all', taskController.getTasks);

router.get('/getTasks/:zaposleniId', taskController.getTasksByUserId)

router.post('/add', taskController.addTask);

router.post('/assign', taskController.assignTask)

module.exports = router;