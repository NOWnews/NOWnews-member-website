import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import { authReducer } from './auth'

export const initStore = (initialState = {}) => {
  // mirror of state from original app
  const reducers = combineReducers({
    auth: authReducer,
    form: formReducer
  })

  let env = process.env.NODE_ENV || 'development'

  if (typeof window !== 'undefined' && env === 'development') {
    return createStore(
      reducers,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
  }

  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
}
