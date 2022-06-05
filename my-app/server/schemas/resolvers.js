const { Book, User } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
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
    getSingleUser: async (parent, { email, password }) => {
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
    deleteBook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: book } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;