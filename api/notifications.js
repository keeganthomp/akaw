import axios from 'axios'
import { NOTIFICATION_API_URL } from './constants'

const makeNotificationRequest = ({ method, body = null, endpoint }) => {
  const finalUrl = NOTIFICATION_API_URL + endpoint
  return axios({
    method,
    url: finalUrl,
    data: body
  })
}

export const addNotification = ({ userId, type, content }) => {
  return makeNotificationRequest({
    endpoint: `/`,
    method: 'POST',
    body: {
      userId,
      content,
      type
    }
  })
}

export const getNotifications = ({ userId }) => {
	return makeNotificationRequest({
			endpoint: `/${userId}`,
			method: 'GET'
	})
}

export const updateNotification = ({ notificationIds }) => {
	return makeNotificationRequest({
			endpoint: `/`,
			method: 'PUT',
			body: {
				notificationIds
			}
	})
}
