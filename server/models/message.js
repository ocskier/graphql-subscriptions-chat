import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  },
});

const Message = model('Message', MessageSchema);
export default Message;
