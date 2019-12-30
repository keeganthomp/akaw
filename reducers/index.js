import { combineReducers } from 'redux';
import userReducer from './userReducer'
import surferReducer from './surferReducer'

export default combineReducers({
  user: userReducer,
  surfer: surferReducer
})