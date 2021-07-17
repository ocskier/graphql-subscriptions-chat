import db from '../../models/index.js';
import { pubsub } from '../../server.js';

const mutations = {
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
    login: async (parent, { creds }) => {
      try {
        const existingUser = await db.User.findOne(creds);
        return {
          success: existingUser,
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
    register: async (parent, { user }) => {
      try {
        const newUser = await db.User.create(user);
        return {
          success: newUser,
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
};

export default mutations;
