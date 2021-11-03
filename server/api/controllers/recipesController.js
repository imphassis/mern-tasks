const rescue = require('express-rescue');
const path = require('path');
const recipesService = require('../services/recipesService');

const { recipesSchema } = require('../schemas/recipesSchema');

const createRecipe = rescue(async (req, res, next) => {
  try {
    const { data, body } = req;
    const { _id: userId } = data;
    const { error } = recipesSchema.validate(body);
    if (error) return next({ error: 'InvalidEntries' });
    const createdRecipe = await recipesService.createRecipe({
      ...body,
      userId,
    });
    return res.status(201).json({ recipe: { ...createdRecipe } });
  } catch (err) {
    return next(err);
  }
});

const getAllRecipes = rescue(async (_req, res, next) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    if (recipes.error) return next({ error: 'InvalidEntries' });
    return res.status(200).json(recipes);
  } catch (err) {
    return next(err);
  }
});

const getRecipeById = rescue(async (req, res, next) => {
  try {
    const recipe = await recipesService.getRecipeById(req.params.id);
    if (recipe.error) return res.status(404).json(recipe.error);
    return res.status(200).json(recipe);
  } catch (err) {
    return next(err);
  }
});

const updateRecipe = rescue(async (req, res, next) => {
  try {
    const { body, params } = req;
    const { id } = params;
    const { error } = recipesSchema.validate(body);
    if (error) return next({ error: 'InvalidEntries' });
    const updatedRecipe = await recipesService.updateRecipe({ id, body });
    if (updatedRecipe.error) return res.status(404).json(updatedRecipe.error);

    return res.status(200).json({ ...updatedRecipe, ...body });
  } catch (err) {
    return next(err);
  }
});

const deleteRecipe = rescue(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await recipesService.deleteRecipe(id);
    if (deletedRecipe === 'Ok') return res.status(204).send();
    if (deletedRecipe.error) return res.status(404).json(deletedRecipe.error);
  } catch (err) {
    return next(err);
  }
});

const uploadImage = rescue(async (req, res, next) => {
  try {
    const {
      params: { id },
      recipe,
    } = req;

    const image = `localhost:3000/src/uploads/${id}.jpeg`;
    const response = await recipesService.updateRecipe({
      id,
      body: { ...recipe.recipe, image },
    });

    if (response.error) return res.status(404).json(response.error);
    return res.status(200).json({ ...req.recipe, userId: id, image });
  } catch (err) {
    return next(err);
  }
});

const getImage = rescue(async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const image = path.join(`${__dirname}../../../uploads/${id}`);
    return res.status(200).sendFile(image);
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  getImage,
};
