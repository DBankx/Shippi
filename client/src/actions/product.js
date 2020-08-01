import axios from 'axios';
import { CREATE_LISTING, ITEM_ERROR, LOADING_PRODUCT } from './types';
import { setAlert } from './alert';

// dispatch loading state
export const loading = () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCT });
};

// list an item on shippi
export const createListing = (listingData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  dispatch(loading());

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
