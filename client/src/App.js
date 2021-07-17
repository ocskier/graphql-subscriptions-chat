import { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Button, Label } from 'semantic-ui-react';

import queries from './utils/queries';
import subscriptions from './utils/subscriptions';

import { AuthModal } from './components/AuthModal';
import { Chat } from './components/Chat';

import { GlobalContext } from './context/store';
import actions from './context/actions';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const { ALL_MESSAGES } = queries;
const { MESSAGES_SUBSCRIPTION } = subscriptions;

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2.5em 0',
    position: 'relative',
    minHeight: '5rem',
  },
  right: {
    justifyContent: 'flex-end',
  },
};

function App() {
  const {
    dispatch,
    state: { user, loggedIn },
  } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const {
    subscribeToMore,
    loading,
    error,
    data: { messages } = {},
  } = useQuery(ALL_MESSAGES);

  const { data: newPost, loading: loadingNewPost } = useSubscription(
    MESSAGES_SUBSCRIPTION
    // {
    //   variables: { },
    // }
  );

  useEffect(() => {
    console.log('Loading: ', loading);
  }, [loading]);
  useEffect(() => {
    console.log('Error: ', error);
  }, [error]);
  useEffect(() => {
    console.log('Message Data: ', messages);
  }, [messages]);
  useEffect(() => {
    console.log('Subscription Post: ', newPost);
  }, [newPost]);
  useEffect(() => {
    console.log('Loading subscription data: ', loadingNewPost);
  }, [loadingNewPost]);
  useEffect(() => {
    console.log('User state value: ', user);
  }, [user]);

  const subscribeToChat = useCallback(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.messageAdded;
        return Object.assign({}, prev, {
          messages: [...prev.messages, newFeedItem],
        });
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    subscribeToChat();
  }, [subscribeToChat]);

  return (
    <div className="App">
      <div
        style={
          !loggedIn ? { ...styles.header, ...styles.right } : styles.header
        }
      >
        {loggedIn && (
          <Label as="a" image>
            <img
              alt="profile"
              src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
            />
            {user.full}
          </Label>
        )}
        <Button
          onClick={() =>
            !loggedIn ? setOpen(true) : dispatch(actions.logout())
          }
        >
          {!loggedIn ? 'Register/Login' : 'Logout'}
        </Button>
        <AuthModal open={open} setOpen={setOpen} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {messages && <Chat messages={messages} />}
    </div>
  );
}

export default App;
