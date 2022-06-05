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
    savedBooks: [bookSchema]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [Book]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(): Schema
    getSingleUser(): Schema
    deleteBook(): Scehma
  }
`;

module.exports = typeDefs;
