import { pubsub } from '../../server.js';

const subscriptions = {
  Subscription: {
    messageAdded: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(['POST_MESSAGE']),
    },
  },
};

export default subscriptions;
