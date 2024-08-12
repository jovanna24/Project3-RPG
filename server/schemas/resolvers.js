const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const User = require('../models/User');
const { signToken } = require('../utils/auth');
const { GraphQLScalarType, Kind } = require('graphql');

// Define the Date scalar
const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar type for date',
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  serialize(value) {
    return value.getTime(); // Convert Date to timestamp for the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert AST to Date
    }
    return null;
  },
});

const resolvers = {
  Date: DateScalar, // Include the Date scalar in resolvers

  Query: {
    me: async (__, _, { user }) => {
      if (!user || !ObjectId.isValid(user._id)) {
        throw new Error('Invalid user ID');
      }
      return await User.findById(user._id);
    },

    getSingleUser: async (_, { userId, username }) => {
      try {
        const validUserId = userId && ObjectId.isValid(userId) ? userId : null;
        const foundUser = await User.findOne({
          $or: [{ _id: validUserId }, { username }],
        });
        if (!foundUser) {
          throw new Error('User not found');
        }
        return foundUser;
      } catch (err) {
        throw new Error(err.message);
      }
    },    
    
    getAllUsers: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    addUser: async (_, { userInput }) => {
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

    updateUser: async (_, { _id, username, email, password }) => {
      try {
        if (!ObjectId.isValid(_id)) {
          throw new Error('Invalid user ID');
        }
        const updateData = { username, email };
        if (password) {
          updateData.password = password;
        }
        return await User.findByIdAndUpdate(_id, updateData, { new: true });
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolvers;
