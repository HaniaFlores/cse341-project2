const express = require('express');
const taskController = require('../controllers/tasks.js');
const { validateTask } = require('../middlewares/tasks.js');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const router = express.Router();

router.post('/', isAuthenticated, validateTask, taskController.createTask);

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getSingleTask);

router.put('/:id', isAuthenticated, validateTask, taskController.updateTask);

router.delete('/:id',isAuthenticated, taskController.deleteTask);


module.exports = router;