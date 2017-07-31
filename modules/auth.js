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
  FORM_SUBMIT_REQUEST: 'FORM_SUBMIT_REQUEST',
  FORM_SUBMIT_SUCCESS: 'FORM_SUBMIT_SUCCESS',
  FORM_SUBMIT_FAIL: 'FORM_SUBMIT_FAIL',
  START_TIMER: 'START_TIMER',
  SWITHCH_TYPE: 'SWITHCH_TYPE',
  TICK: 'TICK'
}


export const getVerifyCode = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.START_TIMER });
  await axios.post('/api/account/verifyCode', formProps);
  return setInterval(() => dispatch({ type: actionTypes.TICK }), 1000)
}

export const onForgotPw = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.START_TIMER });
  const res = await axios.post('/api/auth/forgotpw', formProps);
  return setInterval(() => dispatch({ type: actionTypes.TICK }), 1000)
}

export const onLogin = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.FORM_SUBMIT_REQUEST });
  const res = await axios.post('/api/auth/login', formProps);
  return dispatch({ type: actionTypes.FORM_SUBMIT_SUCCESS, payload: res.data })
}

export const onResetPw = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.FORM_SUBMIT_REQUEST });
  const res = await axios.patch('/api/auth/resetpw', formProps);
  return dispatch({ type: actionTypes.FORM_SUBMIT_SUCCESS, payload: res.data })
}

export const onSignup = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.FORM_SUBMIT_REQUEST });
  const res = await axios.post('/api/auth/signup', formProps);
  return dispatch({ type: actionTypes.FORM_SUBMIT_SUCCESS, payload: res.data })
}

export const onUpdatePw = (formProps) => async dispatch => {
  dispatch({ type: actionTypes.FORM_SUBMIT_REQUEST });
  const res = await axios.patch('/api/member/updatepw', formProps);
  return dispatch({ type: actionTypes.FORM_SUBMIT_SUCCESS, payload: res.data })
}

export const switchType = (type) => dispatch => {
  return dispatch({ type: actionTypes.SWITHCH_TYPE, payload: type })
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORM_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.FORM_SUBMIT_SUCCESS:
    case actionTypes.FORM_SUBMIT_FAIL:
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
