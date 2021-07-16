import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container } from 'semantic-ui-react';
import { Feed, Icon } from 'semantic-ui-react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import mutations from '../utils/mutations';

const { POST_MESSAGE } = mutations;

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
  form: {
    marginTop: '4rem',
  },
  history: {
    marginTop: '2rem',
    fontSize: '1.5rem',
    fontWeight: 600,
    textDecoration: 'underline',
  },
};

export const Chat = ({ messages }) => {
  const [message, setMessage] = useState('');
  const [postMessage, { data }] = useMutation(POST_MESSAGE);
  const submitHandler = async (e) => {
    e.preventDefault();
    await postMessage({ variables: { message: { content: message } } });
  };

  useEffect(() => {
    console.log('Posted message: ', data);
    !data?.error && setMessage('');
  }, [data]);

  useEffect(() => {
    const feed = document.getElementById('feed');
    feed.scrollTop = feed.scrollHeight;
  }, [messages]);

  return (
    <Container style={styles.chatCtn}>
      <h3 style={styles.history}>History</h3>
      <Feed id="feed" style={styles.feed}>
        {messages.length ? (
          messages.map((message, index) => (
            <Feed.Event>
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
      <Form style={styles.form} onSubmit={submitHandler}>
        <Form.Field>
          <label>Message</label>
          <input
            placeholder="Chat Text"
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};
