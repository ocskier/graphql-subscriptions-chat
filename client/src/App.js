import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import queries from './utils/queries';

import './App.css';

function App() {
  const { HELLO } = queries;
  const { loading, error, data } = useQuery(HELLO);
  console.log(loading, error, data);
  useEffect(() => {}, []);
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && <p>{data.message}</p>}
    </div>
  );
}

export default App;
