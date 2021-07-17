import React, { useEffect, useReducer } from 'react';
import { reducer } from './reducer';

const GlobalContext = React.createContext(null);

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    loggedIn: false,
    registered: false,
    user: null,
  });

  useEffect(() => {
    console.log('Updating global store: ', state);
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalProvider, GlobalContext };
