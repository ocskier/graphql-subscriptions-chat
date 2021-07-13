import { gql } from '@apollo/client';

const queries = {
  HELLO: gql`
    query hello {
      message
    }
  `,
};

export default queries;
