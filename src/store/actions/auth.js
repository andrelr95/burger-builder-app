import { AUTH_SUCCESS, AUTH_START, AUTH_FAIL } from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: AUTH_SUCCESS,
    authData
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjSVMemL-8vUADpUr7KaWB4pc1P-2RVgo'
    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjSVMemL-8vUADpUr7KaWB4pc1P-2RVgo'
    }
    axios.post(url, authData)
      .then(res => {
        console.log(res)
        dispatch(authSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}