const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/users', userController.createUser);
userRouter.post('/user/login', userController.login);

module.exports = userRouter;
