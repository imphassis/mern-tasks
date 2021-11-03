const multer = require('multer');
const { getRecipeById } = require('../services/recipesService');
const auth = require('./auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({
  storage,
  auth,
  fileFilter: async (req, file, cb) => {
    if (!req.headers.authorization) {
      return cb({ error: 'MissingAuthToken' }, false);
    }
    
    if (file.mimetype !== 'image/jpeg') {
      req.fileValidationError = true;
      return cb(new Error('Only JPEG images are supported'), false);
    }
    const recipe = await getRecipeById(req.params.id);
    if (recipe.error) {
      req.fileValidationError = true;
      return cb(new Error(recipe.error.message), false);
    }
    req.recipe = recipe;
    return cb(null, true);
  },
});

module.exports = upload;
