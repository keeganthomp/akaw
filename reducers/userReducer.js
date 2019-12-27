const INITIAL_STATE = {}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      const currentUser = action.payload
      const newState = {
        ...currentUser
      }
      return newState;
    default:
      return state
  }
}

export default userReducer
