const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');
const { signToken } = require('../utils/auth');

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
    getChat: async (_, { _id }) => {
      return await Chat.findById(_id).populate('participants');
    },
    getChatMessages: async (_, { chatId }) => {
      try {
        return await ChatMessage.find({ chatId }).populate('sender');
      } catch (err) {
        throw new Error(err.message);
      }
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
      try {
        const chat = new Chat({ name, participants });
        return await chat.save();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    sendMessage: async (_, { chatId, sender, text }) => {
      try {
        const message = new ChatMessage({ chatId, sender, text });
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
