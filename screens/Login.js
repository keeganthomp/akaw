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
  Spinner
} from 'native-base'
import { bindActionCreators } from 'redux'
import { signIn } from '../authentication/auth'
import { connect } from 'react-redux'
import { setUser } from '../actions/userActions'
import { setSurfers } from '../actions/surferActions'
import { setChats } from '../actions/chatActions'
import { setNotifications } from '../actions/notificaitonActions'
import { getSurfers, getUser } from 'surfingit/api/user'
import { getConversations } from 'surfingit/api/chat'
import { getNotifications } from 'surfingit/api/notifications'
import socket from '../socket/'

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
      setChats
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
        socket.emit('userLoggedIn', user)
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
      <Container>
        {isLoggingIn ? (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <Spinner color='#51F6BB' />
            <Text style={{ textAlign: 'center' }}>Logging in</Text>
          </Content>
        ) : (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <AutoHeightImage
                width={300}
                source={require('../assets/surfer-logo.png')}
              />
            </View>
            <Form>
              <Item>
                <Input
                  onChangeText={username => this.setUsername({ username })}
                  placeholder='Username'
                  value={username}
                  autoCapitalize='none'
                />
              </Item>
              <Item last>
                <Input
                  onChangeText={password => this.setPassword({ password })}
                  value={password}
                  secureTextEntry
                  placeholder='Password'
                  autoCapitalize='none'
                  placeholderText
                />
              </Item>
            </Form>
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
                marginVertical: 10,
                backgroundColor: '#51F6BB'
              }}
            >
              <Text style={{ textAlign: 'center' }}>Login</Text>
            </Button>
            <Text
              style={{ textAlign: 'center' }}
              onPress={() => this.props.navigation.navigate('Signup')}
            >
              Sign up
            </Text>
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
      setChats
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Login)
