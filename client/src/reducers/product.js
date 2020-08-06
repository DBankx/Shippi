import {
  CREATE_LISTING,
  ITEM_ERROR,
  LOADING_PRODUCT,
  SEARCH_ITEM,
  CLEAR_ITEMS,
  WATCH_ITEM
} from '../actions/types';

const initialState = {
  loading: false,
  item: null,
  items: null,
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
    case SEARCH_ITEM:
      return {
        ...state,
        loading: false,
        items: payload
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: null
      };
    case WATCH_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === payload.productId
            ? { ...item, watchers: payload.watchers }
            : item
        )
      };
    default:
      return state;
  }
};

export default product;
