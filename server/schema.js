import { buildSchema, buildASTSchema } from 'graphql';

const schema = `
  type Query {
    message: String
  }
`;

export default schema;
