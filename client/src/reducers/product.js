import { CREATE_LISTING, ITEM_ERROR, LOADING_PRODUCT } from '../actions/types';

const initialState = {
  loading: false,
  item: null,
  items: [],
  errors: []
};

const product = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LISTING:
      return {
        ...state,
        loading: false,
        item: payload
      };
    case LOADING_PRODUCT:
      return {
        ...state,
        loading: true
      };
    case ITEM_ERROR:
      return {
        ...state,
        loading: false,
        errors: [payload]
      };
    default:
      return state;
  }
};

export default product;
