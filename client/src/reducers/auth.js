import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_LOAD,
  LOAD_USER,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
  errors: []
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_LOAD:
      return {
        ...state,
        loading: true
      };
    case REGISTER_FAILURE:
    case LOGIN_ERROR:
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: localStorage.removeItem('token')
      };
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        errors: null,
        isAuthenticated: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    default:
      return state;
  }
};

export default auth;
