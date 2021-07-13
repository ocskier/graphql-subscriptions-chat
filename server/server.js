import express from 'express';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const app = express();
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
    ].join(' ');
  })
);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(PORT, () =>
  console.log(`Now browse to http://localhost:${PORT}/graphql`)
);
