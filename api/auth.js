// import axios from 'axios'
// import { CONVERSATION_URL } from './constants'

// const makeConversationRequest = ({ method, body = null, endpoint }) => {
//   const finalUrl = CONVERSATION_URL + endpoint
//   return axios({
//     method,
//     url: finalUrl,
//     data: body
//   })
// }

// export const sendMessage = ({ sender, receiver, message, image }) => {
//   return makeConversationRequest({
//     endpoint: '/',
//     method: 'POST',
//     body: {
//       sender,
//       receiver,
//       body: message,
//       image
//     }
//   })
// }

// export const getConversation = ({ sender, receiver }) => {
//   return makeConversationRequest({
//     endpoint: `/between/${sender}/${receiver}`,
//     method: 'GET'
//   })
// }

// export const getUnreadMessages= ({ user }) => {
//   return makeConversationRequest({
//     endpoint: `/notifications/${user}`,
//     method: 'GET'
//   })
// }
