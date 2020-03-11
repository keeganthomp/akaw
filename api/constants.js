const isProduction = !__DEV__

export const BASE_API_URL = isProduction ? '' : `http://192.168.0.4:9000`

export const USER_API_URL = `${BASE_API_URL}/api/user`
export const PROFILE_API_URL = `${BASE_API_URL}/api/profile`
export const CHAT_API_URL = `${BASE_API_URL}/api/chat`
export const CHAT_MESSAGE_API_URL = `${BASE_API_URL}/api/chat-message`
export const NOTIFICATION_API_URL = `${BASE_API_URL}/api/notifications`