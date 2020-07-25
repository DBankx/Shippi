import axios from 'axios';

// a function to set the token in the header of a request;
const setAuthToken = (token) => {
  if (!token) {
    delete axios.defaults.headers.common['x-auth-token'];
  }
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }
};

export default setAuthToken;
