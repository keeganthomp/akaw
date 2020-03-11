const INITIAL_STATE = []

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS': {
      const notifications = action.payload
      const newState = notifications
      return newState
    }
    case 'ADD_NOTIFICATION': {
      const newNotification = action.payload
      const doesNotificationExist = state.some(
        notification => notification.id === newNotification.id
      )
      if (doesNotificationExist) {
        const newState = [...state, newNotification]
        return newState
      }
    }
    case 'CLEAR_NOTIFICATIONS': {
      return INITIAL_STATE
    }
    default:
      return state
  }
}

export default notificationReducer
