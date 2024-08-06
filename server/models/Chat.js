// server/models/Chat.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
