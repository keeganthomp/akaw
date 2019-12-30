const INITIAL_STATE = {}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      const currentUser = action.payload
      return {
        ...state,
        ...currentUser
      }
    case 'SET_MESSAGES':
      const messages = action.payload
      return {
        ...state,
        messages
      }
    default:
      return state
  }
}

export default userReducer
