import db from '../../models/index.js';
import { pubsub } from '../../server.js';

const mutations = {
  Mutation: {
    postMessage: async (parent, { message: content }, { req }) => {
      console.log('Posting a chat message!');
      try {
        console.log(req.user);
        const newMessage = await db.Message.create({
          ...content,
          user: req.user._id,
        });
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
        const parsedUser = JSON.parse(JSON.stringify(user));
        const cleanUser = Object.assign({}, parsedUser);
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
