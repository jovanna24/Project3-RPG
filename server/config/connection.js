require('dotenv').config();
const mongoose = require('mongoose');

// Use the connection string from the environment variable or fallback to localhost
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interactive-rpg';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
