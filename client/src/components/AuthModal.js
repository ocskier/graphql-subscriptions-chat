import { Modal } from 'semantic-ui-react';

import { AuthForm } from './AuthForm';

export const AuthModal = ({ open, setOpen }) => {
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
        <Modal.Header>Register</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to register?</p>
          <AuthForm setOpen={setOpen} />
        </Modal.Content>
      </Modal>
    </>
  );
};
