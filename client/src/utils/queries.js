import { gql } from '@apollo/client';

const queries = {
  ALL_MESSAGES: gql`
    query getAllMessages {
      messages {
        content
      }
    }
  `,
};

export default queries;
