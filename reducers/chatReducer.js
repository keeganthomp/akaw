const INITIAL_STATE = []

const surferReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CHATS': {
      const chats = action.payload
      const newState = [...state, ...chats]
      return newState
    }
    case 'ADD_MESSAGE_TO_CHAT': {
						const { message, chat } = action.payload
						const { id: chatId } = chat
      const newState = [...state]
      const indexOfChat = newState.findIndex(chat => chat.id === chatId)
      const hasExistingChat = indexOfChat > -1
      if (hasExistingChat) {
        const chatToUpdate = newState[indexOfChat]
        chatToUpdate.messages.unshift(message)
								return newState
      } else {
							return [...state, chat]
						}
    }
    default:
      return state
  }
}

export default surferReducer
