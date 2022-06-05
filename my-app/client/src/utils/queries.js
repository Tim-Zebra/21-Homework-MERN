import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    getSingleUser(username: $username) {
      _id
      username
      email
      savedBooks {
        authors
        title
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
