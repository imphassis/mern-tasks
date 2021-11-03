const Joi = require('joi');

// const userErrorMsg = 'InvalidEntries';
// const loginErrorMsg = 'AllFieldsRequired';

const userSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { userSchema, loginSchema };
