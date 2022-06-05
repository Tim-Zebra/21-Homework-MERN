const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }  

  type Book {
    _id: ID!
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input savingBook {
    authors: [String]
    title: String
    description: String
    bookId: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    getSingleUser(username: String!): User
    savedBooks(username: String): [Book]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savingBook ): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;