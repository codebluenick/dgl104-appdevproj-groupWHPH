const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

let instance = null;

class Database {
  constructor() {
    // Check that only one instance of db class is created
    if (!instance) {
      console.log('Initializing new database connection.'); // will be printed only once when the instance is created
      instance = this;
      this._connect();
    }
    return instance;
  }

  _connect() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connection successful!!!");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
  }
}

module.exports = new Database();
