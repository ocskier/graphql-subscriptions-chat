import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';

import db from '../models/index.js';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log(_id);
  const matchingUser = await db.User.findById(_id)
    .populate('messages')
    .select('-__v -email');
  const parsedUser = JSON.parse(JSON.stringify(matchingUser));
  const cleanUser = Object.assign({}, parsedUser);
  if (cleanUser) {
    console.log(`Deleting password`);
    delete cleanUser.password;
  }
  done(null, cleanUser);
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    try {
      const existingUser = await db.User.findOne({ email }).select('-__v -email');
      if (!existingUser) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(existingUser.password === password)) {
        // if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const parsedUser = JSON.parse(JSON.stringify(existingUser));
      const cleanUser = Object.assign({}, parsedUser);
      if (cleanUser) {
        console.log(`Deleting password`);
        delete cleanUser.password;
      }
      return done(null, cleanUser);
    } catch (err) {
      done(err);
    }
  })
);

export default passport;
