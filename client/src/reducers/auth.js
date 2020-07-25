import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_LOAD
} from '../actions/types';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
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
    case LOGIN_LOAD:
      return {
        ...state,
        loading: true
      };
    case REGISTER_FAILURE:
    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
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
