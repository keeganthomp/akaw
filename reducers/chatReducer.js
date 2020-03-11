const INITIAL_STATE = {
  chatList: [],
  conversations: {},
  isFetching: false
}

const surferReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CHATS': {
      const chats = action.payload
      const newState = { ...state }
      newState.chatList = [...state.chatList, ...chats]
      return newState
    }
    case 'ADD_CONVERSATION': {
      const conversation = action.payload
      const newState = { ...state }
      newState.conversations = {
        ...state.conversations,
        [conversation.id]: {
          ...conversation,
          isUserTyping: false
        }
      }
      return {
        ...newState,
        isFetching: false
      }
    }
    case 'IS_FETCHING_CONVERSATION': {
      const newState = { ...state }
      return {
        ...newState,
        isFetching: true
      }
    }
    case 'ADD_MESSAGE_TO_CONVERSATIONS': {
      const { message, conversation } = action.payload
      const newMessageId = message._id
      const { id: chatId } = conversation
      const newState = { ...state }
      const { conversations } = newState
      const foundConversation = conversations[chatId]
      if (foundConversation) {
        const conversationToUpdate = conversations[chatId]
        const doesMessageAlreadyExist = conversationToUpdate.messages.some(
          message => message._id === newMessageId
        )
        if (!doesMessageAlreadyExist) {
          conversationToUpdate.messages.unshift(message)
        }
        return {
									...newState,
								}
      } else {
        return {
          ...state,
          conversations: {
            ...state.conversations,
            [chatId]: conversation
          }
        }
      }
    }
    case 'SET_USER_IS_TYPING': {
      const { conversationId } = action.payload
      const newState = { ...state }
      const { conversations } = newState
      const conversationToUpdate = conversations[conversationId]
      if (conversationToUpdate) {
        conversationToUpdate.isUserTyping = true
        return newState
      }
    }
    case 'SET_USER_IS_NOT_TYPING': {
      const { conversationId } = action.payload
      const newState = { ...state }
      const { conversations } = newState
      const conversationToUpdate = conversations[conversationId]
      if (conversationToUpdate) {
        conversationToUpdate.isUserTyping = false
        return newState
      }
    }
    case 'CLEAR_CHATS': {
      return INITIAL_STATE
    }
    default:
      return state
  }
}

export default surferReducer
