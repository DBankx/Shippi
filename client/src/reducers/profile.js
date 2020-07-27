import {
  PROFILE_ERROR,
  GET_PROFILE,
  LOAD_PROFILE,
  CLEAR_PROFILE,
  ADD_FEEDBACK,
  DELETE_FEEDBACK
} from '../actions/types';

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
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
    case ADD_FEEDBACK:
      return {
        ...state,
        profile: { ...state.profile, feedback: payload }
      };
    case DELETE_FEEDBACK:
      return {
        ...state,
        profile: {
          ...state.profile,
          feedback: state.profile.feedback.filter(
            (feedback) => feedback._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
};

export default profile;
