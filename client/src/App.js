import { useQuery, useSubscription } from '@apollo/client';
import queries from './utils/queries';
import subscriptions from './utils/subscriptions';

import { Chat } from './components/Chat';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  const { ALL_MESSAGES } = queries;
  const { MESSAGES_SUBSCRIPTION } = subscriptions;
  const { loading, error, data } = useQuery(ALL_MESSAGES);
  const { data: newPost, loading: loadingNewPost } = useSubscription(
    MESSAGES_SUBSCRIPTION
    // {
    //   variables: { postID },
    // }
  );
  console.log(loading, error, data, newPost, loadingNewPost);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && <Chat messages={data.messages} />}
    </div>
  );
}

export default App;
