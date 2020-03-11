export const addNotification = ({ notification }) => ({
  type: 'ADD_NOTIFICATION',
  payload: notification
})

export const setNotifications = ({ notifications }) => ({
	type: 'SET_NOTIFICATIONS',
	payload: notifications
})

export const clearNotifications = () => ({
	type: 'CLEAR_NOTIFICATIONS'
})
