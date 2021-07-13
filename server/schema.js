import { buildSchema, buildASTSchema } from 'graphql';

const schema = `
  type Message {
    content: String
  }
  type Query {
    messages: [Message]
  }
`;

export default schema;
