import axios from 'axios'
import { CHAT_MESSAGE_API_URL } from './constants'

const makeChatMessageRequest = ({ method, body = null, endpoint }) => {
  const finalUrl = CHAT_MESSAGE_API_URL + endpoint
  return axios({
    method,
    url: finalUrl,
    data: body
  })
}

export const createChatMessage = ({ sender, receiver, text }) => {
  return makeChatMessageRequest({
    endpoint: `/`,
    method: 'POST',
    body: {
					 text,
      sender,
      receiver
    }
  })
}
