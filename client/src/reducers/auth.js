import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  errors: []
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload
      };
    case REGISTER_FAILURE:
    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
        errors: [payload]
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload
      };

    default:
      return state;
  }
};

export default auth;
