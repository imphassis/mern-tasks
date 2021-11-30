const errorStatus = {
  MissingAuthToken: { code: 401, message: 'missing auth token' },
  ENOENT: { code: 404, message: 'resource not found' },
  EmailAlreadyRegistered: { code: 409, message: 'Email already registered' },
  AllFieldsRequired: { code: 401, message: 'All fields must be filled' },
  InvalidEntries: { code: 400, message: 'Invalid entries. Try again.' },
  userLoginError: { message: 'Incorrect username or password', code: 401 },
};

module.exports = (err, _req, res, _next) => {
  const { error, code } = err;

  if (error && code) {
    return res.status(code).json(error);
  }

  if (error && !code) {
    return res
      .status(errorStatus[error.message].code)
      .json(errorStatus[error.message]);
  }

  return res.status();
};
