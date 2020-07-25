import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOAD
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// load details
export const loadDetails = () => (dispatch) => {
  dispatch({
    type: LOGIN_LOAD
  });
};

// register a user
export const registerUser = ({
  email,
  username,
  password,
  firstName,
  lastName,
  role,
  country
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    email,
    password,
    firstName,
    lastName,
    username,
    role,
    country
  });

  dispatch(loadDetails());

  try {
    // send the data to the endpoint for making users from the backend
    const res = await axios.post('/api/user', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(
      setAlert(
        'Account Created',
        'Your account has been created and is up and running',
        'success'
      )
    );
  } catch (err) {
    // get the array of errors
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, null, 'error')));
    }

    dispatch({
      type: REGISTER_FAILURE
    });
  }
};

// login a user
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  dispatch(loadDetails());

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    // get the array of errors
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, null, 'error')));
    }

    dispatch({
      type: LOGIN_ERROR,
      payload: 'Server Error'
    });
  }
};
