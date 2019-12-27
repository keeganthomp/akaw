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

export const getSurfee = ({ email }) => {
  return makeSurfeeRequest({
    endpoint: `/surfee/${email}`,
    method: 'GET'
  })
}
