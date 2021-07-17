import { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Button, Label } from 'semantic-ui-react';

import queries from './utils/queries';
import subscriptions from './utils/subscriptions';

import { AuthModal } from './components/AuthModal';
import { Chat } from './components/Chat';

import { GlobalContext } from './context/store';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const { ALL_MESSAGES } = queries;
const { MESSAGES_SUBSCRIPTION } = subscriptions;

function App() {
  const {
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
      <div>
        {!loggedIn && (
          <Button
            onClick={() => setOpen(true)}
            style={{ position: 'absolute', top: '2rem', right: '2rem' }}
          >
            Register/Login
          </Button>
        )}
        {loggedIn && (
          <Label
            style={{ position: 'absolute', top: '2rem', left: '2rem' }}
            as="a"
            image
          >
            <img
              alt="profile"
              src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
            />
            {user.full}
          </Label>
        )}
        <AuthModal open={open} setOpen={setOpen} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {messages && <Chat messages={messages} />}
    </div>
  );
}

export default App;
