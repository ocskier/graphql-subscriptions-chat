import { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import { AuthForm } from './AuthForm';

export const AuthModal = ({ open, setOpen }) => {
  const [formType, setFormType] = useState('login');
  const [error, setError] = useState(false);
  const changeForm = () => {
    setError(false);
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  return (
    <>
      <Modal
        dimmer={true}
        onOpen={
          (e) => console.log('Opening')
          // dispatch({ event: e.type, name: 'onOpen', type: 'OPEN_MODAL' })
        }
        onClose={
          (e) => setOpen(false)
          // dispatch({ event: e.type, name: 'onClose', type: 'CLOSE_MODAL' })
        }
        open={open}
      >
        <Modal.Header>
          {formType === 'login' ? 'Login' : 'Register'}
          <Button
            onClick={changeForm}
            style={{ marginLeft: '2rem' }}
            type="button"
          >
            {formType === 'login' ? '=> Register' : '=> Login'}
          </Button>
        </Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to{' '}
            {formType === 'login' ? 'login' : 'register'}?
          </p>
          <AuthForm
            error={error}
            setError={setError}
            setFormType={setFormType}
            setOpen={setOpen}
            type={formType === 'login' ? 'login' : 'register'}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};
