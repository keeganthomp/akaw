import React, { Component } from 'react'
import { View } from 'react-native'
import { signIn } from './auth'
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
import { setUser } from '../actions/userActions'
import { connect } from 'react-redux'

class Login extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    error: null,
    isLoggingIn: false
  }

  setUsername = ({ username }) => {
    this.setState({ username })
  }
  setPassword = ({ password }) => {
    this.setState({ password })
  }

  setLoggingInStatus = ({ status }) => {
    this.setState({ isLoggingIn: status })
  }

  handleLogin = async () => {
    this.setLoggingInStatus({ status: true })
    const { navigation, setUser } = this.props
    const { username, password } = this.state
    await signIn({
      username,
      password,
      navigate: navigation.navigate,
      setLoggingInStatus: this.setLoggingInStatus,
      setUser
    })
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
                  onChangeText={username => this.setState({ username })}
                  placeholder='Username'
                  value={username}
                  autoCapitalize='none'
                />
              </Item>
              <Item last>
                <Input
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  secureTextEntry
                  placeholder='Password'
                  autoCapitalize='none'
                  placeholderText
                />
              </Item>
            </Form>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
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
      setUser
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Login)
