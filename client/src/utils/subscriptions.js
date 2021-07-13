import { gql } from '@apollo/client';

const subscriptions = {
  MESSAGES_SUBSCRIPTION: gql`
    subscription OnMessageAdded {
      messageAdded {
        id
        content
      }
    }
  `,
};

export default subscriptions;
