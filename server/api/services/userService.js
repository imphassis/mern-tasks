const userModel = require('../models/userModel');

const createUser = async (user) => {
  const checkedUser = await userModel.findByEmail(user.email);
  if (checkedUser) {
    return { error: 'EmailAlreadyRegistered' };
  }
  await userModel.createUser(user);
  const newUser = { ...user };
  delete newUser.password;
  return { user: newUser };
};

const loginUser = async (user) => {
  const checkedUser = await userModel.findByEmail(user.email);
  if (!checkedUser || checkedUser.password !== user.password) {
    return { error: 'userLoginError' };
  }
  delete checkedUser.password;
  return checkedUser;
};

module.exports = {
  createUser,
  loginUser,
};
