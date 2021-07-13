import { Container } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const styles = {
  chatCtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chatListItem: {
    maxWidth: '16rem',
  },
  form: {
    marginTop: '4rem',
  },
  history: {
    textDecoration: 'underline',
  },
};

export const Chat = ({ messages }) => {
  return (
    <Container style={styles.chatCtn}>
      <h3 style={styles.history}>History</h3>
      <List>
        {messages.length &&
          messages.map((message, index) => (
            <List.Item key={index} style={styles.chatListItem}>
              <List.Icon name="users" />
              <List.Content>{message.content}</List.Content>
            </List.Item>
          ))}
      </List>
      <Form style={styles.form}>
        <Form.Field>
          <label>Message</label>
          <input placeholder="Chat Text" />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};
