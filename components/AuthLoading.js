import React from 'react'
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { setUser, setConversations } from '../actions/userActions'
import { setSurfers } from '../actions/surferActions'
import { bindActionCreators } from 'redux'
import { getUserFromUsername, getSurfers } from 'surfingit/api/user'
import { getConversations, getUnreadMessages } from 'surfingit/api/conversation'
const jwtDecode = require('jwt-decode')

class AuthLoadingScreen extends React.Component {
  componentDidMount () {
    this._bootstrapAsync()
  }

  handleToken = async ({ userToken, idToken }) => {
    const { setUser, setConversations, setSurfers } = this.props
    // cognito access token
    const decodedUserToken = jwtDecode(userToken)
    // cognito id token
    const decodedIdToken = jwtDecode(idToken)
    const username = decodedIdToken['cognito:username']
    const { data: surferData } = await getSurfers({ username })
    const surfers = surferData.surfers
    setSurfers({ surfers })
    const userResponse = await getUserFromUsername({ username })
    const user = userResponse.data.user
    setUser({
      user
    })
    const { data: conversations } = await getConversations({
      user: username
    })
    const { data: unreadConversations } = await getUnreadMessages({
      user: username
    })
    const { notifications } = unreadConversations
    await AsyncStorage.setItem(
      'notifications',
      JSON.stringify(notifications.length)
    )
    setConversations({ conversations })
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    const idToken = await AsyncStorage.getItem('idToken')
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
      setConversations
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)
