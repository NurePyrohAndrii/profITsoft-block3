import axios from 'misc/requests';
import config from 'config';
import {
  ERROR_SIGN_IN,
  RECEIVE_USER,
  REQUEST_SIGN_IN,
  REQUEST_USER,
  SUCCESS_SIGN_IN,
  ERROR_RECEIVE_USER,
} from '../constants/actionTypes';


const requestUser = () => ({
  type: REQUEST_USER,
});
const receiveUser = (user) => ({
  payload: user,
  type: RECEIVE_USER,
});
const errorReceiveUser = (errors) => ({
    payload: errors,
    type: ERROR_RECEIVE_USER,
});


const requestSignIn = () => ({
  type: REQUEST_SIGN_IN,
});
const successSignIn = (user) => ({
  payload: user,
  type: SUCCESS_SIGN_IN,
});
const errorSignIn = (errors) => ({
  payload: errors,
  type: ERROR_SIGN_IN,
});


const getUser = () => {
  const {
    PROFILE_URL,
  } = config;
  return axios.get(`${PROFILE_URL}`, { withCredentials: true});
};

const signIn = () => {
  const {
    AUTH_URL,
  } = config;
  return axios.post(`${AUTH_URL}/authenticate`, { withCredentials: true});
};

const fetchSignIn = () => (dispatch) => {
  dispatch(requestSignIn());
  return signIn()
      .then((user) => dispatch(successSignIn(user)))
      .catch((errors) => dispatch(errorSignIn(errors)));
};

const fetchUser = () => (dispatch) => {
  dispatch(requestUser());
  return getUser()
    .then(user => dispatch(receiveUser(user)))
    .catch((errors) => dispatch(errorReceiveUser(errors)));
};


const exportFunctions = {
  fetchSignIn,
  fetchUser,
};

export default exportFunctions;
