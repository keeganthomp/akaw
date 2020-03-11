import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Spinner,
  Label
} from 'native-base'
import { bindActionCreators } from 'redux'
import { signIn } from '../../authentication'
import { connect } from 'react-redux'
import { setUser } from '../../actions/userActions'
import { setSurfers } from '../../actions/surferActions'
import { setChats } from '../../actions/chatActions'
import { setNotifications } from '../../actions/notificaitonActions'
import { getSurfers, getUser } from 'surfingit/api/user'
import { getConversations } from 'surfingit/api/chat'
import { getNotifications } from 'surfingit/api/notifications'
import { initSocketConnection } from '../../socket'
import { primaryColor } from '../../constants/colors'

class Login extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    error: null,
    isLoggingIn: false
  }

  setUsername = ({ username }) => {
    if (this.state.error) {
      this.setState({ error: null })
    }
    this.setState({ username })
  }
  setPassword = ({ password }) => {
    if (this.state.error) {
      this.setState({ error: null })
    }
    this.setState({ password })
  }

  setLoginError = ({ error }) => {
    this.setState({
      error,
      isLoggingIn: false
    })
  }

  setLoggingInStatus = ({ status }) => {
    this.setState({ isLoggingIn: status })
  }

  handleLogin = async () => {
    const {
      navigation,
      setUser,
      setSurfers,
      setNotifications,
      setChats,
      dispatch
    } = this.props
    const { username, password } = this.state
    this.setLoggingInStatus({ status: true })
    try {
      const userFromCognito = await signIn({ username, password })
      if (userFromCognito.challengeName === 'NEW_PASSWORD_REQUIRED') {
      } else {
        const { signInUserSession } = userFromCognito
        const userDataFromToken = signInUserSession.accessToken.payload
        const accessToken = signInUserSession.accessToken.jwtToken
        const { username } = userDataFromToken
        const idToken = signInUserSession.idToken.jwtToken
        await AsyncStorage.setItem('userToken', accessToken)
        await AsyncStorage.setItem('idToken', idToken)
        const {
          data: { user }
        } = await getUser({ username })
        const {
          data: { users: surfers }
        } = await getSurfers({ userId: user.id })
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
        initSocketConnection({ userId: user.id, dispatch })
        navigation.navigate('App')
      }
    } catch (err) {
      const isUserNotConfirmed = err.code === 'UserNotConfirmedException'
      if (isUserNotConfirmed) {
        navigation.navigate('SignupVerify', {
          username
        })
      } else {
        this.setLoginError({ error: err.message })
      }
      this.setLoggingInStatus({ status: false })
    }
  }

  render () {
    const { username, password, error, isLoggingIn } = this.state
    return (
      <Container style={{ backgroundColor: '#f6f6f6' }}>
        {isLoggingIn ? (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <Spinner color={primaryColor} />
            <Text style={{ textAlign: 'center' }}>Logging in</Text>
          </Content>
        ) : (
          <Content
            contentContainerStyle={{
              justifyContent: 'center',
              flex: 1,
              marginLeft: 15,
              marginRight: 15
            }}
          >
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                onChangeText={username => this.setUsername({ username })}
                value={username}
                autoCapitalize='none'
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                onChangeText={password => this.setPassword({ password })}
                value={password}
                secureTextEntry
                autoCapitalize='none'
                placeholderText
              />
            </Item>
            {error && (
              <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>
                {error}
              </Text>
            )}
            <Button
              block
              onPress={() => this.handleLogin()}
              style={{
                marginHorizontal: 5,
                marginVertical: 28,
                backgroundColor: primaryColor
              }}
            >
              <Text style={{ textAlign: 'center' }}>Login</Text>
            </Button>
          </Content>
        )}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser,
      setSurfers,
      setNotifications,
      setChats,
      dispatch
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Login)
