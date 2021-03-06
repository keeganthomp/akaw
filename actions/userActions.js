export const setUser = ({ user }) => ({
  type: 'SET_USER',
  payload: user
})

export const clearUserData = () => ({
  type: 'CLEAR_USER'
})

export const updateUserProfile = ({ profile }) => ({
  type: 'UPDATE_USER_PROFILE',
  payload: profile
})
