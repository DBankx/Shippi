import { REGISTER_FAILURE, REGISTER_SUCCESS } from './types';
import axios from 'axios';
import { setAlert } from './alert';

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
