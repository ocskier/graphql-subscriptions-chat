import { v4 as uuidv4 } from 'uuid';
import { pubsub } from '../server.js';
import db from '../models/index.js';

const resolvers = {
  Query: {
    messages: async () => {
      console.log('Returning all chat messages!');
      try {
        const allMessages = await db.Message.find({});
        return allMessages;
      } catch (err) {}
    },
  },
  Mutation: {
    postMessage: async (parent, { message: content }) => {
      console.log('Posting a chat message!');
      try {
        const newMessage = await db.Message.create(content);
        pubsub.publish('POST_MESSAGE', {
          messageAdded: newMessage,
        });
        return {
          success: newMessage,
          error: null,
        };
      } catch (err) {
        console.log(err);
        return {
          success: null,
          error: {
            message: err.message,
          },
        };
      }
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
