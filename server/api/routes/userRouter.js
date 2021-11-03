const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/users', userController.createUser);
userRouter.get('/:id', userController.login);

module.exports = userRouter;
