const taskModel = require('../models/taskModel');

const createTask = async (recipe) => {
  const response = await taskModel.createTask(recipe);
  return response || null;
};

const getAllTasks = async () => {
  const response = await taskModel.getAllTasks();
  return response || null;
};

const getTaskById = async (id) => {
  const response = await taskModel.getTaskById(id);
  return response || { error: { message: 'task not found' } };
};

const updateTask = async ({ id, body }) => {
  try {
    const checkRecipe = await getTaskById(id);
    const response = await taskModel.updateTask({ id, recipe: body });
    return response ? checkRecipe : null;
  } catch (error) {
    return { error: { message: 'task not found' } };
  }
};

const deleteTask = async (id) => {
  try {
    const checkTask = await getTaskById(id);
    if (checkTask.error) return checkTask;
    return await taskModel.deleteTask(id).then(() => 'Ok');
  } catch (error) {
    return { error: { message: error.message } };
  }
};

const getTasksByUser = async (userId) => {
  const response = await taskModel.getTasksByUser(userId);
  return response || null;
};
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByUser,
};
