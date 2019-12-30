import axios from 'axios'
import { create } from 'react-test-renderer'

const surfeeUrl = __DEV__ ? 'http://localhost:3005/api' : ''

const makeSurfeeRequest = ({ method, body = null, endpoint }) => {
  const finalUrl = surfeeUrl + endpoint
  return axios({
    method,
    url: finalUrl,
    data: body
  })
}

export const createSurfee = ({ username, email }) => {
  return makeSurfeeRequest({
    endpoint: '/surfee',
    method: 'POST',
    body: {
      username,
      email
    }
  })
}

export const getSurfeeFromEmail = ({ email }) => {
  return makeSurfeeRequest({
    endpoint: `/surfee/email/${email}`,
    method: 'GET'
  })
}

export const getSurfeeFromUsername = ({ username }) => {
  return makeSurfeeRequest({
    endpoint: `/surfee/username/${username}`,
    method: 'GET'
  })
}

export const updateSurfeeFromUsername = ({ username, data }) => {
  return makeSurfeeRequest({
    endpoint: '/surfee',
    method: 'PUT',
    body: {
      username,
      data
    }
  })
}
