const express = require('express');
const userController = require('../controllers/users.js');
const router = express.Router();

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getSingleUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);


module.exports = router;