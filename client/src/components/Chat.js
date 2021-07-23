import { useEffect } from 'react';
import { Container, Feed, Icon, Transition } from 'semantic-ui-react';

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
  content: {
    position: 'relative',
  },
  feed: {
    maxHeight: '30em',
    overflow: 'auto',
    minWidth: '24em',
  },
  history: {
    marginTop: '2rem',
    fontSize: '1.5rem',
    fontWeight: 600,
    textDecoration: 'underline',
  },
  meta: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  summaryTop: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export const Chat = ({ messages }) => {
  useEffect(() => {
    var feed = document.querySelector('.feed');
    feed.scrollTop = feed.scrollHeight;
  }, [messages]);
  return (
    <Container style={styles.chatCtn}>
      <h3 style={styles.history}>History</h3>
      <Transition.Group
        as={Feed}
        animation="scale"
        duration={600}
        divided
        style={styles.feed}
      >
        {messages.length ? (
          messages.map((message, index) => {
            let secondsAgo = Math.floor(
              (new Date().getTime() - message.createdAt) / 1000
            );
            return (
              <Feed.Event key={index}>
                <Feed.Label>
                  <Icon name="users" />
                </Feed.Label>
                <Feed.Content style={styles.content}>
                  <Feed.Summary style={styles.summaryTop}>
                    <Feed.User>
                      {message.user ? message.user.username : 'Anonymous'}
                    </Feed.User>
                    <Feed.Date>
                      {secondsAgo < 60
                        ? 'now'
                        : secondsAgo >= 60 && secondsAgo < 60 * 60
                        ? `${Math.floor(secondsAgo / 60)} minutes ago`
                        : secondsAgo >= 60 * 60 && secondsAgo < 24 * 60 * 60
                        ? `${Math.floor(secondsAgo / (60 * 60))} Hours Ago`
                        : `${Math.floor(
                            secondsAgo / (24 * 60 * 60)
                          )} day(s) ago`}
                    </Feed.Date>
                  </Feed.Summary>
                  <Feed.Summary>said</Feed.Summary>
                  <Feed.Extra text style={styles.chatListItem}>
                    {message.content}
                  </Feed.Extra>
                  <Feed.Meta style={styles.meta}>
                    <Feed.Like>
                      <Icon name="like" />
                      {Math.floor(Math.random() * 10)} Likes
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            );
          })
        ) : (
          <p>No messages to display!</p>
        )}
      </Transition.Group>
      <ChatForm />
    </Container>
  );
};
