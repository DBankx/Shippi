import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload,
        user: null
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null
      };

    default:
      return state;
  }
};

export default auth;
