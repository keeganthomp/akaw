import axios from 'axios'

const messageUrl = __DEV__ ? 'http://localhost:3005/api' : ''

const makeMessageRequest = ({ method, body = null, endpoint }) => {
  const finalUrl = messageUrl + endpoint
  return axios({
    method,
    url: finalUrl,
    data: body
  })
}

export const sendMessage = ({ sender, receiver, message, image }) => {
  return makeMessageRequest({
    endpoint: '/message',
    method: 'POST',
    body: {
      sender,
      receiver,
      body: message,
      image
    }
  })
}

export const getAllMessages = ({ receiver }) => {
  return makeMessageRequest({
    endpoint: `/messages/all/${receiver}`,
    method: 'GET'
  })
}

export const getAllMessagesForSender = ({ receiver, sender }) => {
  return makeMessageRequest({
    endpoint: `/messages/all/receiver/${receiver}/sender/${sender}`,
    method: 'GET'
  })
}

export const getUnreadMessages = ({ receiver }) => {
  return makeMessageRequest({
    endpoint: `/messages/unread/${receiver}`,
    method: 'GET'
  })
}

export const getReadMessages = ({ receiver }) => {
  return makeMessageRequest({
    endpoint: `/messages/read/${receiver}`,
    method: 'GET'
  })
}
