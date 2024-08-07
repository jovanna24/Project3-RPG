const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const GameState = require('../models/GameState');
const User = require('../models/User');

// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // Adding stripe for payements from users -Mustafa

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
      return await ChatMessage.find({ chatID }).populate('sender');
    },
    getGameState: async (_, { userId }) => {
      return await GameState.findOne({ user: userId });
    },

  },

  /*
  Will add checkout resolver here -- Mustafa
 checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];

      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },




  */

  Mutation: {
    addUser: async (_, { username, email, password, bio, avatar }) => {
      try {
        const user = await User.create({ username, email, password, bio, avatar });
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
