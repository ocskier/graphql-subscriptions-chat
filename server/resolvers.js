const resolvers = {
  Query: {
    message: () => {
      console.log('Hello route!');
      return 'Hello world!';
    },
  },
};

export default resolvers;
