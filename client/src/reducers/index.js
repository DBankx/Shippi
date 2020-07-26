import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import profile from './profile';

const rootReducer = combineReducers({
  alerts,
  auth,
  profile
});

export default rootReducer;
