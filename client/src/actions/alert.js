import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (message, description, type) => (dispatch) => {
  const id = uuidv4();

  dispatch({ type: SET_ALERT, payload: { id, message, description, type } });

  //   after 4 seconds remove the alert
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  }, 4000);
};
