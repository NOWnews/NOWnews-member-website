import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
const initialState = {
  error: null,
  isLoading: false,
  type: 'phone',
  verifyCodeTimer: 0
}

const actionTypes = {
  FORGOT_PW_REQUEST: 'FORGOT_PW_REQUEST',
  FORGOT_PW_SUCCESS: 'FORGOT_PW_SUCCESS',
  FORGOT_PW_FAIL: 'FORGOT_PW_FAIL',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAIL: 'SIGNUP_FAIL',
  START_TIMER: 'START_TIMER',
  SWITHCH_TYPE: 'SWITHCH_TYPE',
  TICK: 'TICK'
}


export const getVerifyCode = () => dispatch => {
  axios.get('/api/account/verifyCode');
  dispatch({ type: actionTypes.START_TIMER })
  return setInterval(() => dispatch({ type: actionTypes.TICK }), 1000)
}

export const onForgotPw = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.FORGOT_PW_REQUEST });
  // api is temp
  const res = await axios.post('/api/auth/signup', formProps);
  return dispatch({ type: actionTypes.FORGOT_PW_SUCCESS, payload: res.data })
}

export const onLogin = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  const res = await axios.post('/api/auth/login', formProps);
  return dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data })
}

export const onSignup = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.SIGNUP_REQUEST });
  const res = await axios.post('/api/auth/signup', formProps);
  return dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload: res.data })
}

export const switchType = (type) => dispatch => {
  return dispatch({ type: actionTypes.SWITHCH_TYPE, payload: type })
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORGOT_PW_REQUEST:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.FORGOT_PW_SUCCESS:
    case actionTypes.FORGOT_PW_FAIL:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case actionTypes.START_TIMER:
      return {
        ...state,
        verifyCodeTimer: 60
      }
    case actionTypes.SWITHCH_TYPE:
      return {
        ...state,
        type: action.payload
      }
    case actionTypes.TICK:
      return {
        ...state,
        verifyCodeTimer: state.verifyCodeTimer - 1
      }
    default: return state
  }
}
