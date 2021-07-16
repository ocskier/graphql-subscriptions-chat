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
  },
};

export default queries;
