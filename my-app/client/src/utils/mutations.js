import { gql } from '@apollo/client';

// Creates user
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

// logs in user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// saves a book
export const SAVE_BOOK = gql`
mutation saveBook($bookDataInput: BookInput!) {
  saveBook(input: $bookDataInput) {
    _id
    username
    email
    bookCount
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

// deletes a book
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;
