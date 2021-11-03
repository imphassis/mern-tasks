const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { authKey } = require('../../authKey');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    const decoded = jwt.verify(token, authKey);
    const user = await userModel.findByEmail(decoded.email);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.data = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
