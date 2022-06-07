import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
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

export const QUERY_USERS = gql`
  query users {
    users {
      username
    }
  }
`;

// API Query
// const GOOGLE_BOOKS_API = gql`
//   query googleBooks ($query: String!) {
//     person @rest(type: "Book", path: $query) {
//       name
//     }
//   }
// `;
