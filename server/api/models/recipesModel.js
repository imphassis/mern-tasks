const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connect();
  const userCreated = await db.collection('recipes').insertOne(recipe);
  return userCreated.ops[0];
};

const getAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  try {
    const db = await connect();
    const recipe = await db
      .collection('recipes')
      .findOne({ _id: new ObjectId(id) });
    return recipe;
  } catch (err) {
    return null;
  }
};

const updateRecipe = async ({ id, recipe }) => {
  const db = await connect();
  const updatedRecipe = await db
    .collection('recipes')
    .updateOne({ _id: new ObjectId(id) }, { $set: recipe });
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connect();
  const deletedRecipe = await db
    .collection('recipes')
    .deleteOne({ _id: new ObjectId(id) });
  return deletedRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
