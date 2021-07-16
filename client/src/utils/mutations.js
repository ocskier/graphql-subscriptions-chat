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
  REGISTER: gql`
    mutation Register($user: UserInput!) {
      register(user: $user) {
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

export default mutations;
