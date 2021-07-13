import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import queries from './utils/queries';

import { Chat } from './components/Chat';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  const { ALL_MESSAGES } = queries;
  const { loading, error, data } = useQuery(ALL_MESSAGES);
  console.log(loading, error, data);
  useEffect(() => {}, []);
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && <Chat messages={data.messages} />}
    </div>
  );
}

export default App;
