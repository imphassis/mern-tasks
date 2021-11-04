const { ObjectId } = require('mongodb');
const dbo = require('./connection');

const createTask = async (recipe) => {
  const db = dbo.getDb();
  const task = await db.collection('tasks').insertOne(recipe);
  return task;
};

const getAllTasks = async () => {
  const db = dbo.getDb();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

const getTaskById = async (id) => {
  try {
    const db = dbo.getDb();
    const tasks = await db
      .collection('tasks')
      .findOne({ _id: new ObjectId(id) });
    return tasks;
  } catch (err) {
    return null;
  }
};

const updateTask = async ({ id, recipe }) => {
  const db = dbo.getDb();
  const updateTask = await db
    .collection('tasks')
    .updateOne({ _id: new ObjectId(id) }, { $set: recipe });
  return updateTask;
};

const deleteTask = async (id) => {
  const db = dbo.getDb();
  const deletedTask = await db
    .collection('tasks')
    .deleteOne({ _id: new ObjectId(id) });
  return deletedTask;
};

const getTasksByUser = async (userId) => {
  const db = dbo.getDb();
  const tasks = await db
    .collection('tasks')
    .find({ userId: new ObjectId(userId) })
    .toArray();
  return tasks;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByUser,
};
