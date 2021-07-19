const schema = `
  type Message {
    id: String
    content: String
    user: User
    createdAt: String
    updatedAt: String
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
    messages: [Message]
  }
  input UserInput {
    first: String
    last: String
    username: String
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
    me: AuthResponseObject
  }
  type Mutation {
    postMessage(message: MessageContent): ResponseObject
    register(user: UserInput): AuthResponseObject
    login(creds: UserInput): AuthResponseObject
    logout: AuthResponseObject
  }
  type Subscription {
    messageAdded: Message
  }
`;

export default schema;
