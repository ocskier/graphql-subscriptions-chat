import { createContext, useContext, useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';

import actions from '../context/actions';
import queries from '../utils/queries';
import { reducer } from './reducer';

const { ME } = queries;

const GlobalContext = createContext(null);

const useGlobalContext = () => useContext(GlobalContext);

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

export { GlobalProvider, useGlobalContext };
