import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import mutations from '../utils/mutations';

const { POST_MESSAGE } = mutations;

const styles = {
  form: {
    marginTop: '4rem',
  },
};

export const ChatForm = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [postMessage, { data }] = useMutation(POST_MESSAGE);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await postMessage({ variables: { message: { content: message } } });
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    console.log('Posted message: ', data);
    data?.success && setMessage('');
  }, [data]);

  return (
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
      <Button type="submit">Submit</Button>
    </Form>
  );
};
