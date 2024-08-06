const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('graphql');
const { User } = require('../models/User');
const { signToken } = require('../auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('Not authenticated');
    }
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

      const token = signToken(user);
      return { token, user };
    },
    signup: async (parent, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword });

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
