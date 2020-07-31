import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import profile from './profile';
import product from './product';

const rootReducer = combineReducers({
  alerts,
  auth,
  profile,
  product
});

export default rootReducer;
