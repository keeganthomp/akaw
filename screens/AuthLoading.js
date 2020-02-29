import React from 'react'
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { setUser } from '../actions/userActions'
import { setSurfers } from '../actions/surferActions'
import { setChats } from '../actions/chatActions'
import { setNotifications } from '../actions/notificaitonActions'
import { bindActionCreators } from 'redux'
import { getSurfers, getUser } from 'surfingit/api/user'
import { getConversations } from 'surfingit/api/chat'
import { getNotifications } from 'surfingit/api/notifications'
const jwtDecode = require('jwt-decode')

class AuthLoadingScreen extends React.Component {
  componentDidMount () {
    this._bootstrapAsync()
  }

  handleToken = ({ userToken, idToken }) => {
    // cognito access token
    const decodedUserToken = jwtDecode(userToken)
    // cognito id token
    const decodedIdToken = jwtDecode(idToken)
    const username = decodedIdToken['cognito:username']
    return username
  }

  fetchAndSetInitialData = async ({ username }) => {
    const { setUser, setSurfers, setChats, setNotifications } = this.props
    try {
      const {
        data: { users: surfers }
      } = await getSurfers()
      const {
        data: { user }
      } = await getUser({ username })
      const {
        data: { chats }
      } = await getConversations({ userId: user.id })
      const {
        data: { notifications }
      } = await getNotifications({ userId: user.id })
      setNotifications({ notifications })
      setChats({ chats })
      setUser({ user })
      setSurfers({ surfers })
    } catch (error) {
      throw new Error('Unable to fetch data')
    }
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    const idToken = await AsyncStorage.getItem('idToken')
    if (userToken && idToken) {
      const usernameFromToken = this.handleToken({ userToken, idToken })
      try {
        await this.fetchAndSetInitialData({ username: usernameFromToken })
        this.props.navigation.navigate('App')
      } catch (error) {
        this.props.navigation.navigate('Auth')
      }
    } else {
      this.props.navigation.navigate('Auth')
    }
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
      setChats,
      setNotifications
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)
