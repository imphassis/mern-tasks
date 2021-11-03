const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipe) => {
  const response = await recipesModel.createRecipe(recipe);
  return response || null;
};

const getAllRecipes = async () => {
  const response = await recipesModel.getAllRecipes();
  return response || null;
};

const getRecipeById = async (id) => {
  const response = await recipesModel.getRecipeById(id);
  return response || { error: { message: 'recipe not found' } };
};

const updateRecipe = async ({ id, body }) => {
  try {
    const checkRecipe = await getRecipeById(id);
    const response = await recipesModel.updateRecipe({ id, recipe: body });
    return response ? checkRecipe : null;
  } catch (error) {
    return { error: { message: 'recipe not found' } };
  }
};

const deleteRecipe = async (id) => {
  try {
    const checkRecipe = await getRecipeById(id);
    if (checkRecipe.error) return checkRecipe;
    return await recipesModel.deleteRecipe(id).then(() => 'Ok');
  } catch (error) {
    return { error: { message: error.message } };
  }
};
module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
