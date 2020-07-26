import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, LOAD_PROFILE } from './types';

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
