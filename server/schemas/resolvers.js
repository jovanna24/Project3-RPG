const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const GameState = require('../models/GameState');
const User = require('../models/User');

const resolvers = {
  Query: {
    // // Existing queries
    // getCharacter: async (_, { id }) => {
    //   return await Character.findById(id);
    // },
    // getStory: async (_, { id }) => {
    //   return await Story.findById(id).populate('choices');
    // },
    
    // New queries
    getChat: async (_, { id }) => {
      return await Chat.findById(id).populate('participants');
    },
    getChatMessages: async (_, { chatID }) => {
      return await ChatMessage.find({ chatID }).populate('sender');
    },
    getGameState: async (_, { userId }) => {
      return await GameState.findOne({ user: userId });
    },
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, bio, avatar  }) => {
      const user = await User.create({ username, email, password, bio, avatar });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    createChat: async (_, { name, participants }) => {
      const chat = new Chat({ name, participants });
      return await chat.save();
    },
    sendMessage: async (_, { chatID, sender, text }) => {
      const message = new ChatMessage({ chatID, sender, text });
      return await message.save();
    },
    updateGameState: async (_, { userId, level, score }) => {
      return await GameState.findOneAndUpdate(
        { user: userId },
        { level, score, lastSaved: Date.now() },
        { new: true, upsert: true }
      );
    },
    updateUser: async (_, { id, username, email, password, user }) => {
      return await User.findByIdAndUpdate(id, { username, email, password, user }, { new: true });
    },
  },
};

module.exports = resolvers;
