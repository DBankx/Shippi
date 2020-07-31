import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  LOAD_PROFILE,
  ADD_FEEDBACK,
  DELETE_FEEDBACK,
  LOAD_FEEDBACK,
  GET_USER_PROFILE,
  DELETE_ADDRESS,
  ADD_ADDRESS,
  DELETE_ACCOUNT,
  UPDATE_PROFILE
} from './types';
import { setAlert } from './alert';

// load profile
export const loadProfile = () => (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
};

// load feedback
export const loadFeedback = () => (dispatch) => {
  dispatch({ type: LOAD_FEEDBACK });
};

// get profile by username
export const getProfile = (username) => async (dispatch) => {
  dispatch(loadProfile());
  try {
    const res = await axios.get(`/api/profile/${username}`);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// clear the profile from state
export const clearProfile = () => (dispatch) => {
  dispatch({ type: 'CLEAR_PROFILE' });
};

// add feedback to a users profile
export const addFeedback = (rating, comment, profileId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ rating, comment });

  dispatch(loadFeedback());
  try {
    const res = await axios.put(
      `/api/profile/feedback/${profileId}`,
      body,
      config
    );

    dispatch({ type: ADD_FEEDBACK, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// delete feedback from a user
export const deleteFeedback = (profileId, feedbackId) => async (dispatch) => {
  try {
    await axios.delete(`/api/profile/feedback/${profileId}/${feedbackId}`);
    dispatch({ type: DELETE_FEEDBACK, payload: feedbackId });
    dispatch(setAlert('Feedback Deleted', null, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// get current users profile
export const getMyProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({ type: GET_USER_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// edit or create a profile
export const editProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  dispatch(loadProfile());

  try {
    const res = await axios.post('/api/profile', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(
      setAlert(
        edit ? 'Profile updated' : 'Profile Activated',
        edit ? null : 'profile has been activated. Welcome to shippi!',
        'success'
      )
    );

    history.push('/');
  } catch (err) {
    // get the errors from the validation checks
    const errors = err.response.data.errors;

    // loop through the alert and dispatch an alert for each
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, null, 'error')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// add an address
export const addAddress = (formData) => async (dispatch) => {
  dispatch(loadFeedback());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/address', formData, config);

    dispatch({ type: ADD_ADDRESS, payload: res.data });

    dispatch(setAlert('New address added', null, 'success'));
  } catch (err) {
    // get the errors from the validation checks
    const errors = err.response.data.errors;

    // loop through the alert and dispatch an alert for each
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, null, 'error')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// delete an address
export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    await axios.delete(`/api/profile/address/${addressId}`);

    dispatch({ type: DELETE_ADDRESS, payload: addressId });

    dispatch(setAlert('Address deleted', null, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// delete users account
export const deleteAccount = (history) => async (dispatch) => {
  // ask if they are sure in a window
  if (window.confirm('Are you sure you want to delete your account ?')) {
    try {
      await axios.delete('/api/profile');

      history.push('/');

      dispatch({ type: DELETE_ACCOUNT });

      dispatch(setAlert('Account Deleted', null, 'warning'));
    } catch (err) {
      dispatch({ type: PROFILE_ERROR });
    }
  }
};
