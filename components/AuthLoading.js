import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { setUser, setMessages } from '../actions/userActions'
import { setSurfers } from '../actions/surferActions'
import { bindActionCreators } from 'redux'
import { getSurfeeFromUsername } from 'surfingit/api/surfee'
import { getSurferFromUsername, getSurfers } from 'surfingit/api/surfer'
import { getUnreadMessages } from 'surfingit/api/message'
const jwtDecode = require('jwt-decode')

class AuthLoadingScreen extends React.Component {
  componentDidMount () {
    this._bootstrapAsync()
  }

  handleToken = async ({ userToken, idToken }) => {
    const { setUser, setMessages } = this.props
    // cognito access token
    const decodedUserToken = jwtDecode(userToken)
    // cognito id token
    const decodedIdToken = jwtDecode(idToken)
    const accountType = decodedIdToken['custom:accountType']
    const username = decodedIdToken['cognito:username']
    if (accountType === 'surfer') {
      const surfeeResponse = await getSurferFromUsername({ username })
      const surfer = surfeeResponse.data.surfer
      setUser({
        user: {
          ...surfer,
          accountType
        }
      })
    } else {
      const surferResponse = await getSurfeeFromUsername({ username })
      const surfee = surferResponse.data.surfee
      setUser({
        user: {
          ...surfee,
          accountType
        }
      })
    }
    const { data: messageData } = await getUnreadMessages({
      receiver: username
    })
    const messages = messageData.messages
    console.log('MESSIES', messages)
    setMessages({ messages })
  }

  _bootstrapAsync = async () => {
    const { setSurfers } = this.props
    const userToken = await AsyncStorage.getItem('userToken')
    const idToken = await AsyncStorage.getItem('idToken')
    const { data: surferData } = await getSurfers()
    const surfers = surferData.surfers
    setSurfers({ surfers })
    if (userToken && idToken) {
      await this.handleToken({ userToken, idToken })
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser,
      setSurfers,
      setMessages
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)
