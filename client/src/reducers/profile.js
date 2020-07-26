import { PROFILE_ERROR, GET_PROFILE, LOAD_PROFILE } from '../actions/types';

const initialState = {
  loading: false,
  profile: null,
  profiles: [],
  errors: []
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        errors: [payload]
      };
    case LOAD_PROFILE:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default profile;
