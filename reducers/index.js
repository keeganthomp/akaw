import { combineReducers } from 'redux';
import userReducer from './userReducer'
import surferReducer from './surferReducer'
import chatReducer from './chatReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
  user: userReducer,
		surfer: surferReducer,
		chats: chatReducer,
		notifications: notificationReducer
})