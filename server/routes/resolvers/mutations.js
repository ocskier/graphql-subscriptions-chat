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
    login: async (parent, { creds }, { authenticate, login }) => {
      try {
        const { user } = await authenticate('graphql-local', creds);
        await login(user);
        const cleanUser = Object.assign({}, user);
        if (cleanUser) {
          console.log(`Deleting password`);
          delete cleanUser.password;
        }
        if (cleanUser) {
          return {
            success: cleanUser,
            error: null,
          };
        } else {
          return {
            success: null,
            error: {
              message: "User can't be authenticated!",
            },
          };
        }
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
    logout: async (parent, args, { logout, req }) => {
      try {
        await logout();
        return {
          error: null,
        };
      } catch (err) {
        return {
          error: {
            message: "Couldn't log out user!",
          },
        };
      }
    },
  },
};

export default mutations;
