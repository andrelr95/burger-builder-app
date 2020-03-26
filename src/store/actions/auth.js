import {
  AUTH_USER,
  AUTH_SUCCESS,
  AUTH_START,
  AUTH_FAIL,
  AUTH_LOG_OUT,
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  SET_AUTH_REDIRECT_PATH,
  AUTH_CHECKOUT_STATE
} from "./actionTypes";

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: AUTH_SUCCESS,
    token: idToken,
    userId
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const logOut = () => {
  return {
    type: AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: AUTH_LOG_OUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    expirationTime
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: AUTH_USER,
    email,
    password,
    isSignUp
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const checkAuthState = () => {
  return {
    type: AUTH_CHECKOUT_STATE
  };
};
