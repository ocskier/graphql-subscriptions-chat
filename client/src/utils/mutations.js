import { gql } from '@apollo/client';

const mutations = {
  POST_MESSAGE: gql`
    mutation PostMessage($message: MessageContent!) {
      postMessage(message: $message) {
        success {
          id
          content
        }
        error {
          message
        }
      }
    }
  `,
};

export default mutations;
