const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Finds user based off the jwt context
    me: async (parent, args, context) => {
      if(context.user) {
        const userData = User.findOne({ _id: context.user._id });

        return userData;
      }
      throw new AuthenticationError('You are not logged in!');
    },
  },
  Mutation: {
    createUser: async (parent, {username, email, password}) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: args } },
        { new: true }
      );
    },
    deleteBook: async (parent, { bookId }, context) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: {bookId: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;