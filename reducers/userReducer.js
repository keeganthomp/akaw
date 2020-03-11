const INITIAL_STATE = {}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      const currentUser = action.payload
      return {
        ...state,
        ...currentUser
      }
					case 'UPDATE_USER_PROFILE': {
						const updatedProfile = action.payload
						return {
							...state,
							profile: updatedProfile
						}
					}
    case 'CLEAR_USER':
      return INITIAL_STATE
    default:
      return state
  }
}

export default userReducer
