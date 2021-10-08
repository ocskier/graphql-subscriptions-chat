import db from '../models/index.js';

const queries = {
  Query: {
    messages: async () => {
      console.log('Returning all chat messages!');
      try {
        const allMessages = await db.Message.find({}).populate({
          path: 'user',
          select: 'username _id',
        });
        return allMessages;
      } catch (err) {}
    },
    me: async (parent, args, { req }) => {
      if (req.user) {
        console.log('Returning logged in user!');
        const user = Object.assign({}, req.user);
        delete user._id;
        return {
          success: user,
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
