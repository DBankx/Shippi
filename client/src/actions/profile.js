import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  LOAD_PROFILE,
  CLEAR_PROFILE,
  ADD_FEEDBACK,
  DELETE_FEEDBACK,
  LOAD_FEEDBACK,
  GET_USER_PROFILE,
  UPDATE_PROFILE,
  DELETE_ADDRESS,
  ADD_ADDRESS
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
    const res = await axios.delete(
      `/api/profile/feedback/${profileId}/${feedbackId}`
    );
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

  try {
    const res = await axios.post('/api/profile', formData, config);

    dispatch({ type: ADD_ADDRESS, payload: res.data });

    dispatch(
      setAlert(
        edit ? 'Profile updated' : 'Profile Activated',
        edit ? null : 'profile has been activated. Welcome to shippi!',
        'success'
      )
    );

    history.push('/');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// add an address
export const addAddress = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/address', formData, config);

    dispatch({ type: ADD_ADDRESS, payload: res.data });

    dispatch(setAlert('New address created', null, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};

// delete an address
export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/address/${addressId}`);

    dispatch({ type: DELETE_ADDRESS, payload: res.data });

    dispatch(setAlert('Address deleted', null, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: 'Error occurred'
    });
  }
};
