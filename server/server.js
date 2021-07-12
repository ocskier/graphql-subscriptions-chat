import express from 'express';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const PORT = process.env.PORT || 4000;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    console.log('Hello route!');
    return 'Hello world!';
  },
};

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
    rootValue: root,
    graphiql: true,
  })
);
app.listen(PORT, () =>
  console.log(`Now browse to http://localhost:${PORT}/graphql`)
);
