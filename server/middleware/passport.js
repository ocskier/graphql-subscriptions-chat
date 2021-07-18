import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';

import db from '../models/index.js';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log(_id);
  const matchingUser = await db.User.findById(_id);
  done(null, matchingUser);
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    try {
      const existingUser = await db.User.findOne({ email });
      if (!existingUser) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(existingUser.password === password)) {
        // if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, existingUser);
    } catch (err) {
      done(err);
    }
  })
);

export default passport;
