const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const GameState = require('../models/GameState');
const User = require('../models/User');

const resolvers = {
  Query: {
    // Existing queries
    getCharacter: async (_, { id }) => {
      return await Character.findById(id);
    },
    getStory: async (_, { id }) => {
      return await Story.findById(id).populate('choices');
    },
    
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
    // Existing mutations
    updateCharacter: async (_, { id, inventory, location }) => {
      return await Character.findByIdAndUpdate(id, { inventory, location }, { new: true });
    },
    createStory: async (_, { title, text }) => {
      const story = new Story({ title, text });
      return await story.save();
    },
    makeChoice: async (_, { storyId, choiceId }) => {
      const story = await Story.findById(storyId).populate('choices');
      const choice = story.choices.find(c => c.id === choiceId);
      
      if (choice.outcome) {
        return {
          story: choice.outcome.story,
          success: true
        };
      }
      
      return {
        story: null,
        success: false
      };
    },
    
    // New mutations
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
    updateUser: async (_, { id, username, email, password, profile }) => {
      return await User.findByIdAndUpdate(id, { username, email, password, profile }, { new: true });
    },
  },
};

module.exports = resolvers;
