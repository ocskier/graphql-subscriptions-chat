import express from 'express';
import session from 'express-session';
import mongoSession from 'connect-mongodb-session';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { buildContext } from 'graphql-passport';
import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { connectToDB } from './db/connection.js';
import passport from './middleware/passport.js';
import typeDefs from './routes/schema.js';
import resolvers from './routes/resolvers/index.js';

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

const MongoDBStore = mongoSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL || 'mongodb://localhost:27017/chat',
  collection: 'mongo-sessions',
});
// Catch errors
store.on('error', function (error) {
  console.log(error);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    // withCredentials: true,
    // origin: 'http://localhost:4000/graphql',
  })
);
app.use(
  session({
    secret: 'chat secret',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
    store: store,
    resave: true,
    saveUninitialized: true,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
  context: ({ req, res }) => buildContext({ req, res }),
});

server.applyMiddleware({ app, cors: false });
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
