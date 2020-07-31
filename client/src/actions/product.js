import axios from 'axios';
import { CREATE_LISTING, ITEM_ERROR } from './types';
import { setAlert } from './alert';

// list an item on shippi
export const createListing = (listingData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  try {
    const res = await axios.post('/api/product', listingData, config);

    dispatch({ type: CREATE_LISTING, payload: res.data });
    dispatch(setAlert('Listing published succesfully', null, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, null, 'error')));
    }

    dispatch({ type: ITEM_ERROR, payload: 'Error occured' });
  }
};
