const Joi = require('joi');

const recipesSchema = Joi.object().keys({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

module.exports = { recipesSchema };
