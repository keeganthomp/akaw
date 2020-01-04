import Amplify, { Auth } from 'aws-amplify'
import { AsyncStorage } from 'react-native'
import { getUserFromUsername, getSurfers } from 'surfingit/api/user'
import { getConversations, getUnreadMessages } from 'surfingit/api/conversation'

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

export const signup = async ({ username, password, email, accountType }) => {
  return Auth.signUp({
    username,
    password,
    attributes: {
      email,
      'custom:accountType': accountType
    },
    validationData: [] //optional
  })
}

export const confrimSingup = ({ username, code }) => {
  return Auth.confirmSignUp(username, code, {
    forceAliasCreation: true
  })
}

export const signIn = async ({
  navigate,
  username,
  password,
  setUser,
  setConversations,
  setSurfers,
  setLoginError
}) => {
  try {
    const user = await Auth.signIn(username, password)
    if (
      user.challengeName === 'SMS_MFA' ||
      user.challengeName === 'SOFTWARE_TOKEN_MFA'
    ) {
      // You need to get the code from the UI inputs
      // and then trigger the following function with a button click
      const code = getCodeFromUserInput()
      // If MFA is enabled, sign-in should be confirmed with the confirmation code
      const loggedUser = await Auth.confirmSignIn(
        user, // Return object from Auth.signIn()
        code, // Confirmation code
        mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
      )
    } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const { requiredAttributes } = user.challengeParam // the array of required attributes, e.g ['email', 'phone_number']
      // You need to get the new password and required attributes from the UI inputs
      // and then trigger the following function with a button click
      // For example, the email and phone_number are required attributes
      const { username, email, phone_number } = getInfoFromUserInput()
      const loggedUser = await Auth.completeNewPassword(
        user, // the Cognito User Object
        newPassword, // the new password
        // OPTIONAL, the required attributes
        {
          email,
          phone_number
        }
      )
    } else if (user.challengeName === 'MFA_SETUP') {
      // This happens when the MFA method is TOTP
      // The user needs to setup the TOTP before using it
      // More info please check the Enabling MFA part
      Auth.setupTOTP(user)
    } else {
      const { signInUserSession } = user
      const userData = signInUserSession.accessToken.payload
      const username = userData.username
      const { data: surferData } = await getSurfers({ username })
      const surfers = surferData.surfers
      const userResponse = await getUserFromUsername({ username })
      const userFromDb = userResponse.data.user
      const { data: conversations } = await getConversations({
        user: username
      })
      const { data: unreadConversations } = await getUnreadMessages({
        user: username
      })
      const { notifications } = unreadConversations
      const notificationCount = JSON.stringify(notifications.length)
      setSurfers({ surfers })
      setUser({
        user: userFromDb
      })
      setConversations({ conversations })
      const accessToken = signInUserSession.accessToken.jwtToken
      const idToken = signInUserSession.idToken.jwtToken
      await AsyncStorage.setItem('notifications', notificationCount)
      await AsyncStorage.setItem('userToken', accessToken)
      await AsyncStorage.setItem('idToken', idToken)
      navigate('App')
    }
  } catch (err) {
    console.log('Error logging in:', err.message)
    if (setLoginError) {
      setLoginError({ error: 'Incorrect username or password' })
    }
    if (err.code === 'UserNotConfirmedException') {
      // The error happens if the user didn't finish the confirmation step when signing up
      // In this case you need to resend the code and confirm the user
      // About how to resend the code and confirm the user, please check the signUp part
    } else if (err.code === 'PasswordResetRequiredException') {
      // The error happens when the password is reset in the Cognito console
      // In this case you need to call forgotPassword to reset the password
      // Please check the Forgot Password part.
    } else if (err.code === 'NotAuthorizedException') {
      // The error happens when the incorrect password is provided
    } else if (err.code === 'UserNotFoundException') {
      // The error happens when the supplied username/email does not exist in the Cognito user pool
    } else {
      console.log('Uncaught Error:', err)
    }
  }
}

export const logout = async ({ navigate }) => {
  await Auth.signOut({ global: true })
  AsyncStorage.clear()
  navigate('Auth')
}
