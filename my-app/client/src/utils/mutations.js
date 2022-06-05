import { gql } from '@apollo/client';

// Creates user
export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
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
mutation saveBook($input: savingBook) {
  saveBook(input: $input) {
    username
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
export const DELETE_BOOK = gql`

`;
