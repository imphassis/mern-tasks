const dbo = require('./connection');

const createUser = async (user) => {
  const db = dbo.getDb();
  const userCreated = await db.collection('users').insertOne(user);
  return userCreated;
};

const findById = async (id) => {
  const db = await dbo.getDb();
  const userData = await db.collection('users').findOne({ _id: id });
  return userData;
};

const findByEmail = async (email) => {
  const db = await dbo.getDb();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

module.exports = { createUser, findById, findByEmail };
