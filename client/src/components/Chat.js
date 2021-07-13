import { Container } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const styles = {
  chatListItem: {
    maxWidth: '16rem',
  },
};

export const Chat = ({ messages }) => {
  return (
    <Container>
      <List>
        {messages.length &&
          messages.map((message, index) => (
            <List.Item key={index} style={styles.chatListItem}>
              <List.Icon name="users" />
              <List.Content>{message.content}</List.Content>
            </List.Item>
          ))}
      </List>
      <Form>
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
