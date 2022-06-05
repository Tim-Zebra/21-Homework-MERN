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
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
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
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },
  },
};

module.exports = resolvers;