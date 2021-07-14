import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
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
    maxWidth: '16rem',
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

  return (
    <Container style={styles.chatCtn}>
      <h3 style={styles.history}>History</h3>
      <List>
        {messages.length ? (
          messages.map((message, index) => (
            <List.Item key={index} style={styles.chatListItem}>
              <List.Icon name="users" />
              <List.Content>{message.content}</List.Content>
            </List.Item>
          ))
        ) : (
          <p>No messages to display!</p>
        )}
      </List>
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
