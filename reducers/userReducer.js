const INITIAL_STATE = {
  notifications: []
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      const currentUser = action.payload
      return {
        ...state,
        ...currentUser
      }
    case 'SET_NOTIFICATIONS':
      const newNotification = action.payload
      const updatedNotifications = [...state.notifications, newNotification]
      return {
        ...state,
        notifications: updatedNotifications
      }
    case 'CLEAR_DATA':
      return INITIAL_STATE
    default:
      return state
  }
}

export default userReducer
