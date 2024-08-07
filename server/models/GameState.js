// server/models/GameState.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameStateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  lastSaved: {
    type: Date,
    default: Date.now,
  },
});

const GameState = mongoose.model('GameState', GameStateSchema);

module.exports = GameState;
