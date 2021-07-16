export function reducer(state, { type, payload }) {
  switch (type) {
    case 'REGISTER':
      return { ...state, registered: true };
    case 'LOGIN':
      return {
        ...state,
        ...payload,
        loggedIn: true,
        registered: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
      };
    case 'GET_USER':
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error();
  }
}
