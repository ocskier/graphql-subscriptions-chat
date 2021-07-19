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
  LOGIN: gql`
    mutation Login($creds: UserInput!) {
      login(creds: $creds) {
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
  LOGOUT: gql`
    mutation Logout {
      logout {
        error {
          message
        }
      }
    }
  `,
};

export default mutations;
