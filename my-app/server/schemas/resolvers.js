const { Book, User } = require('../models');

const resolvers = {
  Query: {
    // May only need user or getSingleUser
    user: async () => {
      return User.find({});
    },
    getSingleUser: async (parent, { userId }) => {
      return Profile.findOne({ _id: userId });
    },
    savedBooks: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },

  },
  Mutation: {
    createUser: async (parent, {username, email, password}) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { savedBooks: book },
        },
        {
          new: true,
        }
      );
    },
    deleteBook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: book } },
        { new: true }
      );
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
  },
};

module.exports = resolvers;