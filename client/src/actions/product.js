import axios from 'axios';
import {
  CREATE_LISTING,
  ITEM_ERROR,
  LOADING_PRODUCT,
  SEARCH_ITEM
} from './types';
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

// conditional searching for items
export const searchItem = (
  format,
  condition,
  order,
  sortBy,
  page,
  title,
  category
) => async (dispatch) => {
  dispatch(loading());

  try {
    const res = await axios.get(
      `/api/products/find?${title && `title=${title}`}${
        format && `&format=${format}`
      }${condition && `&condition=${condition}`}${
        category && `&category=${category}`
      }${sortBy && `&sortBy=${sortBy}`}${
        order && `&order=${order}`
      }&page=${page}&limit=8`
    );

    console.log(res);

    dispatch({ type: SEARCH_ITEM, payload: res.data });
  } catch (err) {
    dispatch({ type: ITEM_ERROR, payload: 'Error occured' });
  }
};
