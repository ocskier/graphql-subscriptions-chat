import { Container, Feed, Icon } from 'semantic-ui-react';

import { ChatForm } from './ChatForm';

const styles = {
  chatCtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '2.5em',
  },
  chatListItem: {
    minWidth: '16rem',
  },
  feed: {
    maxHeight: '30em',
    overflow: 'auto',
  },
  history: {
    marginTop: '2rem',
    fontSize: '1.5rem',
    fontWeight: 600,
    textDecoration: 'underline',
  },
};

export const Chat = ({ messages }) => {
  return (
    <Container style={styles.chatCtn}>
      <h3 style={styles.history}>History</h3>
      <Feed id="feed" style={styles.feed}>
        {messages.length ? (
          messages.map((message, index) => (
            <Feed.Event key={index}>
              <Feed.Label>
                <Icon name="users" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>User</Feed.User>
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Summary>said</Feed.Summary>
                <Feed.Extra text style={styles.chatListItem}>
                  {message.content}
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" />0 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          ))
        ) : (
          <p>No messages to display!</p>
        )}
      </Feed>
      <ChatForm />
    </Container>
  );
};
