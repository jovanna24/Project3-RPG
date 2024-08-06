// server/models/Character.js

const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  inventory: [String],
  location: String
});

module.exports = mongoose.model('Character', CharacterSchema);