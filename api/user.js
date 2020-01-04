import axios from 'axios'

const USER_API_URL = __DEV__ ? 'https://localhost:3005/api/user' : ''

const makeUserRequest = ({ method, body = null, endpoint }) => {
  const finalUrl = USER_API_URL + endpoint
  return axios({
    method,
    url: finalUrl,
    data: body
  })
}

export const getSurfers = ({ username }) => {
  return makeUserRequest({
    endpoint: `/surfers/${username}`,
    method: 'GET'
  })
}

export const getSurfees = () => {
  return makeUserRequest({
    endpoint: '/surfees',
    method: 'GET'
  })
}

export const createUser = ({ username, email, accountType }) => {
  return makeUserRequest({
    endpoint: '/',
    method: 'POST',
    body: {
      username,
      email,
      accountType
    }
  })
}

export const getUserFromEmail = ({ email }) => {
  return makeUserRequest({
    endpoint: `/email/${email}`,
    method: 'GET'
  })
}

export const getUserFromUsername = ({ username }) => {
  return makeUserRequest({
    endpoint: `/username/${username}`,
    method: 'GET'
  })
}

export const updateUserFromUsername = ({ username, data }) => {
  return makeUserRequest({
    endpoint: '/',
    method: 'PUT',
    body: {
      username,
      data
    }
  })
}
