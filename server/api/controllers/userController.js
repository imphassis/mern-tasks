const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userService = require('../services/userService');

const { userSchema, loginSchema } = require('../schemas/userSchema');

const { authKey, jtwConfig } = require('../../authKey');

const createUser = rescue(async (req, res, next) => {
  const newUser = { ...req.body, role: 'user' };
  const { error } = userSchema.validate(req.body);
  if (error) return next({ error: 'InvalidEntries' });
  const user = await userService.createUser(newUser);
  if (user.error) return next(user);
  return res.status(201).json(user);
});

const login = rescue(async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next({ error: 'AllFieldsRequired', code: 401 });
  const { email, password } = req.body;
  const user = await userService.loginUser({ email, password });

  if (user.error) return next(user);
  const { _id, role } = user;
  const data = { id: _id, email, role };
  const token = jwt.sign(data, authKey, jtwConfig);
  return res.status(200).json({ token, user });
});

module.exports = {
  createUser,
  login,
};
