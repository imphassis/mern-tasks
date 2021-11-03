module.exports = (req, res, next) => {
  const { data } = req;
  if (data.role !== 'admin') {
    return res.status(401).json({
      message: 'You are not authorized to access this route',
    });
  }
  next();
};
