import Amplify, { Auth } from 'aws-amplify'
import { AsyncStorage } from 'react-native'

import {
  AWS_IDENTITY_POOL_ID,
  AWS_REGION,
  AWS_USER_POOL_ID,
  AWS_APP_CLIENT_ID
} from 'react-native-dotenv'

Amplify.configure({
  Auth: {
    identityPoolId: AWS_IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: AWS_USER_POOL_ID,
    userPoolWebClientId: AWS_APP_CLIENT_ID
  }
})

export const signup = ({ username, password, email, accountType }) => {
  return Auth.signUp({
    username,
    password,
    attributes: {
      email,
      'custom:accountType': accountType
    },
    validationData: []
  })
}

export const confrimSingup = ({ username, code }) => {
  return Auth.confirmSignUp(username, code, {
    forceAliasCreation: true
  })
}

export const signIn = ({ username, password }) => {
  return Auth.signIn(username, password)
}

export const logout = async ({ navigate, clearUserData }) => {
  await Auth.signOut({ global: true })
  clearUserData()
  AsyncStorage.clear()
  navigate('Auth')
}
