const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

const resolvers = {
  Query: {
    me: async (__, _, { user }) => {
      const foundUser = await User.findOne({ _id: user._id });
      return foundUser;
    }, 

    getSingleUser: async (_, { userId, username}, { user }) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ _id: userId ? userId: user._id }, { username: username }],
        });
        if (!foundUser) {
          throw new Error('User not found');
        }
        return foundUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    getChat: async (_, { id }) => {
      return await Chat.findById(id).populate('participants');
    },
    getChatMessages: async (_, { chatID }) => {
      try {
        return await ChatMessage.find({ chatID }).populate('sender');
      } catch (err) {
        throw new Error(err.message);
      }
    },

  },

  Mutation: {
    addUser: async(_, { userInput }) => {
      console.log(userInput);
      try {
        const user = await User.create(userInput);
        if (!user) {
          throw new Error('User not created');
        }
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    updateUser: async (_, { _id, username, email, bio, avatar }) => {
      return await User.findByIdAndUpdate(_id, { username, email, bio, avatar }, { new: true });
    },

    login: async (_, { usernameOrEmail, password }) => {
      try {
        const user = await User.findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });
        if (!user) {
          throw new Error('User not found');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new Error('Incorrect password');
        }
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    createChat: async (_, { name, participants }) => {
      const chat = new Chat({ name, participants });
      return await chat.save();
    },
    sendMessage: async (_, { chatID, sender, text }) => {
      try {
        const message = new ChatMessage({ chatID, sender, text });
        return await message.save();
      } catch (err) {
        throw new Error(err.message);
      }
    },
    updateUser: async (_, { id, username, email, password, user }) => {
      return await User.findByIdAndUpdate(id, { username, email, password, user }, { new: true });
    },
  },
};

module.exports = resolvers;
