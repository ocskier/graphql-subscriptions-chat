const TYPES = {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const actions = {
  login: (user) => ({
    type: TYPES.LOGIN,
    payload: { user },
  }),
  logout: () => ({
    type: TYPES.LOGOUT,
    payload: {},
  }),
};

module.exports = actions;
