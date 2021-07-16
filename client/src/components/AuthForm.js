import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Checkbox, Container, Form, Icon } from 'semantic-ui-react';

// import mutations from '../utils/mutations';

// const { REGISTER } = mutations;

const styles = {
  submitBtns: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export const AuthForm = ({ setOpen }) => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
  });
  const [register, { data, loading }] = useMutation(gql`
    mutation Register($user: UserInput!) {
      register(user: $user) {
        success {
          _id
          first
          last
          username
          email
          password
          full
        }
        error {
          message
        }
      }
    }
  `);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register({ variables: { user: formData } });
      setOpen(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    console.log('User registered: ', data);
    console.log(data, loading);
    data?.success && clearForm();
  }, [data, loading]);

  const clearForm = () => {
    setFormData({});
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Field>
        <label>First Name</label>
        <input
          name="first"
          placeholder="First Name"
          value={formData.first}
          onChange={onInputChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          name="last"
          placeholder="Last Name"
          value={formData.last}
          onChange={onInputChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={onInputChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onInputChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onInputChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="I agree to the Terms and Conditions"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </Form.Field>
      <Container style={styles.submitBtns}>
        <Button animated positive>
          <Button.Content visible>Yes</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
        {error && <p>There was a problem registering!!</p>}
        <Button onClick={(e) => setOpen(false)} type="button" negative>
          No
        </Button>
      </Container>
    </Form>
  );
};
