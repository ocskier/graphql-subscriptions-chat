const schema = `
  type Message {
    id: String
    content: String
  }
  input MessageContent {
    content: String!
  }
  type ResponseObject {
    success: Message
    error: Error
  }
  type User {
    _id: ID
    first: String
    last: String
    username: String
    email: String
    password: String
    full: String
  }
  input UserInput {
    first: String!
    last: String!
    username: String!
    email: String!
    password: String!
  }
  type AuthResponseObject {
    success: User
    error: Error
  }
  type Error {
    message: String
  }
  type Query {
    messages: [Message]
  }
  type Mutation {
    postMessage(message: MessageContent): ResponseObject
    register(user: UserInput): AuthResponseObject
  }
  type Subscription {
    messageAdded: Message
  }
`;

export default schema;
