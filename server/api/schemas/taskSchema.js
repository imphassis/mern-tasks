const Joi = require('joi');

const taskSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title cannot be empty',
    'string.required': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description cannot be empty',
    'string.required': 'Description is required',
  }),
  completed: Joi.boolean().required().messages({
    'boolean.base': 'Completed must be a boolean',
    'boolean.empty': 'Completed cannot be empty',
    'boolean.required': 'Completed is required',
  }),
  date: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description cannot be empty',
    'string.required': 'Description is required',
  }),
});

module.exports = { taskSchema };
