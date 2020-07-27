import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  LOAD_PROFILE,
  CLEAR_PROFILE,
  ADD_FEEDBACK,
  DELETE_FEEDBACK
} from './types';
import { setAlert } from './alert';

// load profile
export const loadProfile = () => (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
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
