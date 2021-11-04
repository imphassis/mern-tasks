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
    const createdRecipe = await taskService.createTask({
      ...body,
      userId,
    });
    return res.status(201).json({ recipe: { ...createdRecipe } });
  } catch (err) {
    return next(err);
  }
});

const getAllTasks = rescue(async (_req, res, next) => {
  try {
    const recipes = await taskService.getAllTasks();
    if (recipes.error) return next({ error: 'InvalidEntries' });
    return res.status(200).json(recipes);
  } catch (err) {
    return next(err);
  }
});

const getTaskById = rescue(async (req, res, next) => {
  try {
    const recipe = await taskService.getTaskById(req.params.id);
    if (recipe.error) return res.status(404).json(recipe.error);
    return res.status(200).json(recipe);
  } catch (err) {
    return next(err);
  }
});

const updateTask = rescue(async (req, res, next) => {
  try {
    const { body, params } = req;
    const { id } = params;
    const { error } = recipesSchema.validate(body);
    if (error) return next({ error: 'InvalidEntries' });
    const updatedRecipe = await taskService.updateTask({ id, body });
    if (updatedRecipe.error) return res.status(404).json(updatedRecipe.error);

    return res.status(200).json({ ...updatedRecipe, ...body });
  } catch (err) {
    return next(err);
  }
});

const deleteTask = rescue(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await taskService.deleteTask(id);
    if (deletedRecipe === 'Ok') return res.status(204).send();
    if (deletedRecipe.error) return res.status(404).json(deletedRecipe.error);
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
