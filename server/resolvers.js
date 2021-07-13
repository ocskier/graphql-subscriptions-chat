const resolvers = {
  Query: {
    messages: () => {
      console.log('Returning all chat messages!');
      return [{ content: 'Hello world!' }];
    },
  },
  Mutation: {
    postMessage: (parent, { message }) => {
      console.log('Posting a chat message!');
      return {
        success: {
          id: '1',
          content: message.content,
        },
        error: null,
      };
    },
  },
};

export default resolvers;
