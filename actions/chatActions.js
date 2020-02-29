export const setChats = ({ chats }) => ({
  type: 'SET_CHATS',
  payload: chats
})

export const addMessageToChat = ({ chat, message }) => ({
  type: 'ADD_MESSAGE_TO_CHAT',
  payload: {
    chat,
    message
  }
})
