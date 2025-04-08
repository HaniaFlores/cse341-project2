const express = require('express');
const userController = require('../controllers/users.js');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const router = express.Router();

router.post('/', userController.createUser);

router.get('/', isAuthenticated, userController.getAllUsers);

router.get('/:id', isAuthenticated, userController.getSingleUser);

router.put('/:id', isAuthenticated, userController.updateUser);

router.delete('/:id', isAuthenticated, userController.deleteUser);


module.exports = router;