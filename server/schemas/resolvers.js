const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'mysecretssshhhhhhh';
const expiration = '2h';

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('Not authenticated');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user with that email');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: expiration });

      return { token, user };
    },
    signup: async (parent, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: expiration });

      return { token, user };
    },
  },
};

module.exports = resolvers;
