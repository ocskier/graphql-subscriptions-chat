import { gql } from '@apollo/client';

const queries = {
  ALL_MESSAGES: gql`
    query getAllMessages {
      messages {
        content
        user {
          _id
          username
        }
        createdAt
      }
    }
  `,
  ME: gql`
    query me {
      me {
        success {
          _id
          first
          last
          username
          email
          full
          messages {
            content
          }
        }
        error {
          message
        }
      }
    }
  `,
};

export default queries;
