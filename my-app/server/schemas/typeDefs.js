const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    authors: String!
    descriptions: String!
    bookId: String!
    image: String!
    link: String!
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [bookSchema]
  }

  type Query {
    user: [User]
    savedBooks(_id: String): [Book]
  }

  type Mutation {
    createUser(): Schema
    saveBook(): Schema
    getSingleUser(): Schema
    deleteBook(): Scehma
  }
`;

module.exports = typeDefs;
