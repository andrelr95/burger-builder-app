import axios from "axios";

import { put, delay } from "redux-saga/effects";
import {
  authStart,
  authSuccess,
  checkAuthTimeout,
  authFail,
  logoutSucceed,
  logOut
} from "../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logOut());
}

export function* authUserSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjSVMemL-8vUADpUr7KaWB4pc1P-2RVgo";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjSVMemL-8vUADpUr7KaWB4pc1P-2RVgo";
  }

  try {
    const response = yield axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(authFail(err.response.data.error));
  }
}

export function* checkAuthStateSaga(action) {
  const token = yield localStorage.getItem("token");
  const userId = yield localStorage.getItem("userId");
  if (!token) {
    yield put(logOut());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate < new Date()) {
      yield put(logOut());
    } else {
      yield put(authSuccess(token, userId));
      yield put(
        checkAuthTimeout(expirationDate.getTime() - new Date().getTime() / 1000)
      );
    }
  }
}
