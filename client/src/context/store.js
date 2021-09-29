import React, { useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';

import actions from '../context/actions';
import queries from '../utils/queries';
import { reducer } from './reducer';

const { ME } = queries;

const GlobalContext = React.createContext(null);

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    loggedIn: false,
    user: null,
  });

  const { error, data: userData } = useQuery(ME);

  useEffect(() => {
    console.log(userData);
    console.log('Updating global store: ', state);
  }, [userData, state]);

  useEffect(() => {
    userData?.me.success && dispatch(actions.login(userData.me.success));
    userData?.me.error && console.log(userData.me.error);
  }, [userData]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalProvider, GlobalContext };
