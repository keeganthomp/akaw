export const setChats = ({ chats }) => ({
  type: 'SET_CHATS',
  payload: chats
})

export const isFetchingConversation = () => ({
  type: 'IS_FETCHING_CONVERSATION' 
})

export const addConversation = ({ conversation }) => ({
  type: 'ADD_CONVERSATION',
  payload: conversation
})

export const addMessageToConversation = ({ conversation, message }) => ({
  type: 'ADD_MESSAGE_TO_CONVERSATIONS',
  payload: {
    message,
    conversation
  }
})

export const setUserIsTyping = ({ conversationId, isTyping }) => ({
  type: 'SET_USER_IS_TYPING',
  payload: {
    conversationId,
    isTyping
  }
})

export const setUserNotTyping = ({ conversationId, isTyping }) => ({
  type: 'SET_USER_IS_NOT_TYPING',
  payload: {
    conversationId,
    isTyping
  }
})

export const clearChats = () => ({
  type: 'CLEAR_CHATS'
})
