import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

export function connectToDB(cb) {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log(
      `Successful connection to ${
        process.env.MONGODB_URL || 'mongodb://localhost:27017/chat'
      }`
    );
    cb();
  });
}
