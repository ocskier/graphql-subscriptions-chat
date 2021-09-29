export function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        ...payload,
        loggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loggedIn: false,
      };
    // case 'GET_USER':
    //   return {
    //     ...state,
    //     ...payload,
    //     loggedIn: true,
    //   };
    default:
      throw new Error();
  }
}
