const INITIAL_STATE = []

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      {
        const notifications = action.payload
        const newState = notifications
        return newState
      }
    case 'ADD_NOTIFICATION': {
      const { type, content } = action.payload
      const normalizedNotificationObject = {
        type,
        content,
        hasBeenSeen: false
      }
      const newState = [...state, normalizedNotificationObject]
      return newState
    }

    default:
      return state
  }
}

export default notificationReducer
