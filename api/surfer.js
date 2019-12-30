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

export const getSurfers = () => {
  return makeSurferRequest({
    endpoint: '/surfers',
    method: 'GET'
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

export const getSurferFromEmail = ({ email }) => {
  return makeSurferRequest({
    endpoint: `/surfer/email/${email}`,
    method: 'GET'
  })
}

export const getSurferFromUsername = ({ username }) => {
  return makeSurferRequest({
    endpoint: `/surfer/username/${username}`,
    method: 'GET'
  })
}

export const updateSurferFromUsername = ({ username, data }) => {
  return makeSurferRequest({
    endpoint: '/surfer',
    method: 'PUT',
    body: {
      username,
      data
    }
  })
}
