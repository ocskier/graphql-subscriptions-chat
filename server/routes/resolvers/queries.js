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
      console.log(req.user);
      if (req.user) {
        console.log(req.user);
        const user = JSON.parse(JSON.stringify(req.user));
        const cleanUser = Object.assign({}, user);
        console.log(`Deleting password`);
        delete cleanUser.password;
        return {
          success: cleanUser,
          error: null,
        };
      } else {
        return {
          success: null,
          error: {
            message: 'User not logged in!!!',
          },
        };
      }
    },
  },
};

export default queries;
