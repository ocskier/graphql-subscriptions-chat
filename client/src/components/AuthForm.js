import { useEffect, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Checkbox, Container, Form, Icon } from 'semantic-ui-react';

import { GlobalContext } from '../context/store';
import actions from '../context/actions';
import mutations from '../utils/mutations';

const { REGISTER, LOGIN } = mutations;

const styles = {
  submitBtns: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export const AuthForm = ({ setOpen, type }) => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
  });
  const { dispatch } = useContext(GlobalContext);
  const [register, { data: registerData, loadingRegister }] =
    useMutation(REGISTER);
  const [login, { data: loginData, loadingLogin }] = useMutation(LOGIN);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (checked || type === 'login') {
      try {
        if (type === 'register') {
          await register({ variables: { user: formData } });
        } else {
          await login({
            variables: {
              creds: { email: formData.email, password: formData.password },
            },
          });
        }
      } catch (err) {
        setError(true);
      }
    }
  };

  useEffect(() => {
    console.log('User registered: ', registerData);
    registerData?.register.success && setFormData({});
    registerData?.register.success && setOpen(false);
    registerData?.register.success && dispatch(actions.register());
    registerData?.register.error && setError(true);
  }, [dispatch, registerData, setOpen]);

  useEffect(() => {
    console.log('User logged in: ', loginData);
    loginData?.login.success && setFormData({});
    loginData?.login.success && setOpen(false);
    loginData?.login.success &&
      dispatch(actions.login(loginData.login.success));
    loginData?.login.error && setError(true);
  }, [dispatch, loginData, setOpen]);

  useEffect(() => {
    console.log('Loading register: ', loadingRegister);
  }, [loadingRegister]);

  useEffect(() => {
    console.log('Loading login: ', loadingLogin);
  }, [loadingLogin]);

  return (
    <Form onSubmit={submitHandler}>
      {type === 'register' && (
        <>
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
        </>
      )}
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
      {type === 'register' && (
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </Form.Field>
      )}
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
