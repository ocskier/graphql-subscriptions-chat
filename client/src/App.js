import { useCallback, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import queries from './utils/queries';
import subscriptions from './utils/subscriptions';

import { Chat } from './components/Chat';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const { ALL_MESSAGES } = queries;
const { MESSAGES_SUBSCRIPTION } = subscriptions;

function App() {
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
  console.log('Loading: ', loading);
  console.log('Error: ', error);
  console.log('Message Data: ', messages);
  console.log('Subscription Post: ', newPost);
  console.log('Loading subscription data: ', loadingNewPost);

  const subscribeToChat = useCallback(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.messageAdded;
        return Object.assign({}, prev, {
          messages: [newFeedItem, ...prev.messages],
        });
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    subscribeToChat();
  }, [subscribeToChat]);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {messages && <Chat messages={messages} />}
    </div>
  );
}

export default App;
