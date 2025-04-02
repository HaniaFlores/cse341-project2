const express = require('express');
const taskController = require('../controllers/tasks.js');
const { validateTask } = require('../middlewares/tasks.js');
const router = express.Router();

router.post('/', validateTask, taskController.createTask);

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getSingleTask);

router.put('/:id', validateTask, taskController.updateTask);

router.delete('/:id', taskController.deleteTask);


module.exports = router;