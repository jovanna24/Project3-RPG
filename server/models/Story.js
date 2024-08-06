// server/models/Story.js

const mongoose = require('mongoose');

const ChoiceSchema = new mongoose.Schema({
  text: String,
  outcome: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  }
});

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  choices: [ChoiceSchema]
});

module.exports = mongoose.model('Story', StorySchema);