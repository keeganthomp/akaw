import axios from 'axios'
import { USER_API_URL } from './constants'

const makeUserRequest = ({ method, body = null, endpoint }) => {
  const finalUrl = USER_API_URL + endpoint
  return axios({
    method,
    url: finalUrl,
    data: body
  })
}

export const getSurfers = () => {
  return makeUserRequest({
    endpoint: `/list/surfer/`,
    method: 'GET'
  })
}

export const createUser = ({ username, email, accountType, password }) => {
  return makeUserRequest({
    endpoint: '/',
    method: 'POST',
    body: {
      username,
      email,
      accountType,
      password
    }
  })
}

export const getUser = ({ username, userId }) => {
  const userIdentifier = username || userId
  return makeUserRequest({
    endpoint: `/${userIdentifier}`,
    method: 'GET'
  })
}

export const verifyUser = ({ username, id }) => {
	return makeUserRequest({
		endpoint: '/verify',
		method: 'POST',
		body: {
				username,
				id
		}
})
}
