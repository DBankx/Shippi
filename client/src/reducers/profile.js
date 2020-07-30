import {
  PROFILE_ERROR,
  GET_PROFILE,
  LOAD_PROFILE,
  CLEAR_PROFILE,
  ADD_FEEDBACK,
  DELETE_FEEDBACK,
  LOAD_FEEDBACK,
  GET_USER_PROFILE,
  UPDATE_PROFILE,
  DELETE_ADDRESS,
  ADD_ADDRESS
} from '../actions/types';

const initialState = {
  loading: false,
  otherLoading: false,
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
        profile: { ...state.profile, feedback: payload },
        loading: false,
        otherLoading: false
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
        loading: false,
        otherLoading: false
      };
    case LOAD_FEEDBACK:
      return {
        ...state,
        otherLoading: true
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
        otherLoading: false
      };
    case ADD_ADDRESS:
      return {
        ...state,
        profile: { ...state.profile, addresses: payload },
        loading: false
      };
    case DELETE_ADDRESS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          addresses: state.profile.addresses.filter(
            (add) => add._id !== payload
          ),
          loading: false
        }
      };
    }
    default:
      return state;
  }
};

export default profile;
