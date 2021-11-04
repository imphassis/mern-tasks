const errorStatus = {
  MissingAuthToken: { code: 401, message: 'missing auth token' },
  ENOENT: { code: 404, message: 'resource not found' },
  EmailAlreadyRegistered: { code: 409, message: 'Email already registered' },
  AllFieldsRequired: { code: 401, message: 'All fields must be filled' },
  InvalidEntries: { code: 400, message: 'Invalid entries. Try again.' },
  userLoginError: { message: 'Incorrect username or password', code: 401 },
};

module.exports = (err, _req, res, _next) => {
  console.log(err);
  const { error, code } = err;
  return res.status(code).json({ error });
};
