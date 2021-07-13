import { pubsub } from './server.js';
import { v4 as uuidv4 } from 'uuid';

const messageData = [];

const resolvers = {
  Query: {
    messages: () => {
      console.log('Returning all chat messages!');
      return messageData;
    },
  },
  Mutation: {
    postMessage: (parent, { message }) => {
      console.log('Posting a chat message!');
      const newMessage = {
        id: uuidv4(),
        content: message.content,
      };
      messageData.push(newMessage);
      pubsub.publish('POST_MESSAGE', {
        messageAdded: newMessage,
      });
      return {
        success: newMessage,
        error: null,
      };
    },
  },
  Subscription: {
    messageAdded: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(['POST_MESSAGE']),
    },
  },
};

export default resolvers;
