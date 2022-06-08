import { gql } from '@apollo/client';

// Creates user
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
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
export const DELETE_BOOK = gql`
mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    username
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
