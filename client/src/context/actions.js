const TYPES = {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'GET_USER',
};

const actions = {
  register: () => ({
    type: TYPES.REGISTER,
    payload: {},
  }),
  login: (user) => ({
    type: TYPES.LOGIN,
    payload: { user },
  }),
  logout: () => ({
    type: TYPES.LOGOUT,
    payload: {},
  }),
  getUser: (user) => ({
    type: TYPES.GET_USER,
    payload: { user },
  }),
};

module.exports = actions;
