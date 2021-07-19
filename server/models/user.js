import mongoose from 'mongoose';
import validator from 'validator';
const { Schema, model } = mongoose;
const { isEmail } = validator;

const emptyStr = 'You must supply a valid string';

const UserSchema = new Schema(
  {
    first: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      minLength: 1,
    },
    last: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      minLength: 1,
    },
    username: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      minLength: 7,
    },
    email: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      validate: {
        validator: function (v) {
          return isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      minLength: 7,
      unique: true,
    },
    password: {
      type: String,
      required: [true, emptyStr],
      trim: true,
      minLength: 8,
    },
    full: {
      type: String,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre('save', function () {
  this.full = `${this.first} ${this.last}`;
});

const User = model('User', UserSchema);
export default User;
