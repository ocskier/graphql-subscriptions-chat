const schema = `
  type Message {
    id: String
    content: String
  }
  type Error {
    message: String
  }
  type MessageId {
    id: String
  }
  type ResponseObject {
    success: Message
    error: Error
  }
  input MessageContent {
    content: String!
  }
  type Query {
    messages: [Message]
  }
  type Mutation {
    postMessage(message: MessageContent): ResponseObject
  }
  type Subscription {
    messageAdded: Message
  }
`;

export default schema;
