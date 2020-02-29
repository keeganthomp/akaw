import axios from 'axios'
import { CHAT_API_URL } from './constants'

const makeChatRequest = ({ method, body = null, endpoint }) => {
  const finalUrl = CHAT_API_URL + endpoint
  return axios({
    method,
    url: finalUrl,
    data: body
  })
}

export const getConversations = ({ userId }) => {
  return makeChatRequest({
    endpoint: `/${userId}`,
    method: 'GET'
  })
}

export const getConversation = ({ receiverId, senderId }) => {
  return makeChatRequest({
    endpoint: `/conversation/${receiverId}/${senderId}`,
    method: 'GET'
  })
}
