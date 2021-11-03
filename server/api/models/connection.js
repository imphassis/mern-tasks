const { MongoClient } = require('mongodb');

require('dotenv').config();
const Db = process.env.ATLAS_URI;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(Db, OPTIONS);

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db('myFirstDatabase');
        console.log('Successfully connected to MongoDB.');
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
