import axios from 'axios';
import {
  CREATE_LISTING,
  ITEM_ERROR,
  LOADING_PRODUCT,
  SEARCH_ITEM,
  CLEAR_ITEMS,
  WATCH_ITEM,
  CLEAR_ITEM,
  GET_ITEM_BY_ID
} from './types';
import { setAlert } from './alert';

// clear the previous items
export const clearItems = () => (dispatch) => {
  dispatch({ type: CLEAR_ITEMS });
};

// clear item
export const clearItem = () => (dispatch) => {
  dispatch({ type: CLEAR_ITEM });
};

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

// get product by id
export const getItemById = (productId) => async (dispatch) => {
  dispatch(clearItem());
  dispatch(loading());

  try {
    const res = await axios.get(`/api/products/find/${productId}`);

    dispatch({ type: GET_ITEM_BY_ID, payload: res.data });
  } catch (err) {
    dispatch({ type: ITEM_ERROR, payload: 'Error occured' });
  }
};

// watch an item
export const watchItem = (productId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/products/watch/${productId}`);

    dispatch({ type: WATCH_ITEM, payload: { productId, watchers: res.data } });
  } catch (err) {
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
  dispatch(clearItems());
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

    dispatch({ type: SEARCH_ITEM, payload: res.data });
  } catch (err) {
    dispatch({ type: ITEM_ERROR, payload: 'Error occured' });
  }
};
