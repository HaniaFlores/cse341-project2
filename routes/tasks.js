const express = require('express');
const taskController = require('../controllers/tasks.js');
const router = express.Router();

router.post('/', taskController.createTask);

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getSingleTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);


module.exports = router;