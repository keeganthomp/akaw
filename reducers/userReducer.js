const INITIAL_STATE = {}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      const currentUser = action.payload
      return {
        ...state,
        ...currentUser
      }
    case 'SET_CONVERSATIONS':
      const conversations = action.payload
      return {
        ...state,
        ...conversations
      }
    default:
      return state
  }
}

export default userReducer
