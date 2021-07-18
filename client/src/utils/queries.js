import { gql } from '@apollo/client';

const queries = {
  ALL_MESSAGES: gql`
    query getAllMessages {
      messages {
        content
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
          password
          full
        }
        error {
          message
        }
      }
    }
  `,
};

export default queries;
