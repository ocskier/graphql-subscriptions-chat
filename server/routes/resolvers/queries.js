import db from '../../models/index.js';

const queries = {
  Query: {
    messages: async () => {
      console.log('Returning all chat messages!');
      try {
        const allMessages = await db.Message.find({});
        return allMessages;
      } catch (err) {}
    },
    me: async (parent, args, { req }) => {
      return req.user
        ? {
            success: req.user,
            error: null,
          }
        : {
            success: null,
            error: {
              message: 'User not logged in!!!',
            },
          };
    },
  },
};

export default queries;
