import axios from 'axios'

const surferUrl = __DEV__ ? 'http://localhost:3005/api' : ''

const makeSurferRequest = ({ method, body = null, endpoint }) => {
  const finalUrl = surferUrl + endpoint
  return axios({
    method,
    url: finalUrl,
    data: body
  })
}

export const createSurfer = ({ username, email }) => {
  return makeSurferRequest({
    endpoint: '/surfer',
    method: 'POST',
    body: {
      username,
      email
    }
  })
}

export const getSurfer = ({ email }) => {
  return makeSurferRequest({
    endpoint: `/surfer/${email}`,
    method: 'GET'
  })
}
