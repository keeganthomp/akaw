export const addNotification = ({ type, content }) => ({
  type: 'ADD_NOTIFICATION',
  payload: {
			type,
			content
		}
})

export const setNotifications = ({ notifications }) => ({
	type: 'SET_NOTIFICATIONS',
	payload: notifications
})
