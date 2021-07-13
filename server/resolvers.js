const resolvers = {
  Query: {
    messages: () => {
      console.log('Returning all chat messages!');
      return [{ content: 'Hello world!' }];
    },
  },
};

export default resolvers;
