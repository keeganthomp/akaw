import io from 'socket.io-client'
import { addNotification } from '../actions/notificaitonActions'
import {
  setUserIsTyping,
  setUserNotTyping,
  addMessageToConversation
} from '../actions/chatActions'
import { BASE_API_URL } from '../api/constants'
import _ from 'lodash'

import socketActions from './constants'

const {
  RECEIVE_MESSAGE,
  MESSAGE_SENT,
  RECEIVE_TYPING_USER,
  USER_IS_TYPING,
  USER_IS_NOT_TYPING,
  RECEIVE_NON_TYPING_USER
} = socketActions

let socket

export const initSocketConnection = ({ userId, dispatch }) => {
  socket = io(BASE_API_URL, { query: { userId } })
  createSocketConsumers({ dispatch })
}

export const createSocketConsumers = ({ dispatch }) => {
  socket.on(
    RECEIVE_MESSAGE,
    ({ message, conversation, receiver, notification }) => {
					console.log('RECEIVED MESSAge')
      dispatch(addMessageToConversation({ conversation, message }))
      dispatch(
        addNotification({ notification: { ...notification } })
      )
    }
  )
  socket.on(RECEIVE_TYPING_USER, conversation => {
    const { chatId } = conversation
    dispatch(setUserIsTyping({ conversationId: chatId, isTyping: true }))
  })
  socket.on(RECEIVE_NON_TYPING_USER, conversation => {
    const { chatId } = conversation
    dispatch(setUserNotTyping({ conversationId: chatId, isTyping: false }))
  })
}

// socket emiters
export const getSocketConnectionStatus = () => socket.connected

export const emitMessageSent = ({
  sender,
  receiver,
  newMessage,
  conversation,
  notification
}) =>
  socket.emit(MESSAGE_SENT, {
    sender,
    receiver,
    message: newMessage,
    conversation,
    notification
  })

export const emitTypingUser = ({ typingUser, receivingUser, chatId }) => {
  socket.emit(USER_IS_TYPING, { typingUser, receivingUser, chatId })
}

export const emitStopTypingUser = ({ typingUser, receivingUser, chatId }) => {
  socket.emit(USER_IS_NOT_TYPING, { typingUser, receivingUser, chatId })
}

export const disconnectUserFromSocket = () => {
  socket.disconnect()
}
