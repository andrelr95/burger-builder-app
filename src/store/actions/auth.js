import {
  AUTH_SUCCESS,
  AUTH_START,
  AUTH_FAIL,
  AUTH_LOG_OUT,
  SET_AUTH_REDIRECT_PATH
} from "./actionTypes";
import axios from "axios";

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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOG_OUT
  };
};

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjSVMemL-8vUADpUr7KaWB4pc1P-2RVgo";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjSVMemL-8vUADpUr7KaWB4pc1P-2RVgo";
    }
    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(logOut());
      } else {
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            expirationDate.getTime() - new Date().getTime() / 1000
          )
        );
      }
    }
  };
};
