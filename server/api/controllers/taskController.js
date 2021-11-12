const rescue = require('express-rescue');
const path = require('path');
const taskService = require('../services/taskService');

const { taskSchema } = require('../schemas/taskSchema');

const createTask = rescue(async (req, res, next) => {
  try {
    const { data, body } = req;
    const { _id: userId } = data;
    const { error } = taskSchema.validate(body);

    if (error) return next({ error: error.message, code: 400 });
    const createdTask = await taskService.createTask({
      ...body,
      userId,
    });
    return res.status(201).json({ recipe: { ...createdTask } });
  } catch (err) {
    return next(err);
  }
});

const getAllTasks = rescue(async (_req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    if (tasks.error) return next({ error: 'InvalidEntries' });
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
});

const getTaskById = rescue(async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (task.error) return next({ code: 404, error: task.error });
    return res.status(200).json(task);
  } catch (err) {
    return next(err);
  }
});

const updateTask = rescue(async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const { error } = taskSchema.validate(body);
    if (error) return next({ error: 'InvalidEntries' });
    const updatedTask = await taskService.updateTask({ id, body });
    if (updatedTask.error) return next({ code: 404, error: updatedTask.error });
    return res.status(200).json({ ...updatedTask, ...body });
  } catch (err) {
    return next(err);
  }
});

const deleteTask = rescue(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);
    if (deletedTask === 'Ok') return res.status(204).send();
    if (deletedTask.error) return next({ code: 404, error: deletedTask.error });
  } catch (err) {
    return next(err);
  }
});

const getTasksByUser = rescue(async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipes = await taskService.getTasksByUser(id);
    if (recipes.error) return next({ error: 'InvalidEntries' });
    return res.status(200).json(recipes);
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByUser,
};
