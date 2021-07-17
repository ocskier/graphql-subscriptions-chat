import { useEffect, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Checkbox, Container, Form, Icon } from 'semantic-ui-react';

import { GlobalContext } from '../context/store';
import actions from '../context/actions';
import mutations from '../utils/mutations';

const { REGISTER, LOGIN } = mutations;

const emptyFormData = {
  first: '',
  last: '',
  username: '',
  email: '',
  password: '',
};

const styles = {
  submitBtns: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export const AuthForm = ({ error, setError, setOpen, type, setFormType }) => {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState(emptyFormData);
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
    registerData?.register.success && setFormData(emptyFormData);
    registerData?.register.success && setFormType('login');
    registerData?.register.success && setError(false);
    registerData?.register.error && setError(true);
  }, [registerData, setError, setFormType]);

  useEffect(() => {
    loginData?.login.success && setFormData(emptyFormData);
    loginData?.login.success && setOpen(false);
    loginData?.login.success &&
      dispatch(actions.login(loginData.login.success));
    loginData?.login.error && setError(true);
  }, [dispatch, loginData, setError, setOpen]);

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
        {error && <p>There was a problem with authentication!!</p>}
        <Button onClick={(e) => setOpen(false)} type="button" negative>
          No
        </Button>
      </Container>
    </Form>
  );
};
