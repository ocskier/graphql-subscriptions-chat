import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { connectToDB } from './db/connection.js';
import typeDefs from './routes/schema.js';
import resolvers from './routes/resolvers.js';
import db from './models/index.js';

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

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
  console.log('YOU ARE IN THE PRODUCTION ENV');
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  app.use(
    '/static',
    express.static(path.join(__dirname, '../client/build/static'))
  );
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/'));
  });
}

const httpServer = createServer(app);
const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app });
const subscriptionServer = SubscriptionServer.create(
  {
    // This is the `schema` we just created.
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
    onConnect(connectionParams, webSocket, context) {
      console.log('Connected!');
    },
    onDisconnect(webSocket, context) {
      console.log('Disconnected!');
    },
  },
  {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // This `server` is the instance returned from `new ApolloServer`.
    path: server.graphqlPath,
  }
);

// Shut down in the case of interrupt and termination signals
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => subscriptionServer.close());
});

connectToDB(() =>
  httpServer.listen(PORT, () => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Production server started!');
    } else {
      console.log(`Now browse to http://localhost:${PORT}/graphql`);
    }
  })
);
