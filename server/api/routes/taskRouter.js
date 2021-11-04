const express = require('express');
const { auth } = require('../middlewares');

const taskController = require('../controllers/taskController');

const taskRouter = express.Router();

// CREATE A TASK
taskRouter.post('/task', auth, taskController.createTask);

// GET ALL TASKS
taskRouter.get('/task', taskController.getAllTasks);

// GET ALL TASKS BY USER ID
taskRouter.get('/task/user/:id', taskController.getTasksByUser);

// GET SPECIFIC TASK BY ID
taskRouter.get('/task/:id', taskController.getTaskById);

// UPDATE A TASK
taskRouter.put('/task/:id', taskController.updateTask);

// DELETE A TASK
taskRouter.delete('/task/:id', taskController.deleteTask);

module.exports = taskRouter;
