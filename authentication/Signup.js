import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { signup } from './auth'
import VerifySignup from './SignupVerify'
import { createSurfee } from 'surfingit/api/surfee'
import { createSurfer } from 'surfingit/api/surfer'
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
  Picker,
  Icon,
  Label
} from 'native-base'
import { bindActionCreators } from 'redux'
import { setUser } from '../actions/userActions'
import { connect } from 'react-redux'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    error: null,
    accountType: 'surfee',
    createdUsername: null,
    isSigningUp: false
  }

  setUsername = ({ username }) => {
    this.setState({ username })
  }
  setPassword = ({ password }) => {
    this.setState({ password })
  }
  setEmail = ({ email }) => {
    this.setState({ email })
  }
  handleAccountTypeChange = ({ accountType }) => {
    this.setState({ accountType })
  }

  handleSignup = async () => {
    const { username, password, email, accountType } = this.state
    this.setState({ isSigningUp: true })
    try {
      const result = await signup({ username, password, email, accountType })
      const { userConfirmed } = result
      const createdUsername = username
      if (accountType === 'surfee') {
        await createSurfee({ username, email })
      } else {
        await createSurfer({ username, email })
      }
      this.setState({ createdUsername, userConfirmed, isSigningUp: false })
    } catch (error) {
      const { message } = error
      this.setState({ error: message, isSigningUp: false })
    }
  }

  render () {
    const {
      username,
      password,
      error,
      email,
      createdUsername,
      isSigningUp,
      accountType
    } = this.state
    const { navigation, setUser } = this.props
    return (
      <Container>
        {isSigningUp ? (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <Spinner color='#51F6BB' />
            <Text style={{ textAlign: 'center' }}>Signing Up</Text>
          </Content>
        ) : (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            {createdUsername ? (
              <VerifySignup
                username={createdUsername}
                password={password}
                navigate={navigation.navigate}
                setUser={setUser}
              />
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
                  <Item>
                    <Input
                      onChangeText={email => this.setState({ email })}
                      placeholder='Email'
                      autoCapitalize='none'
                      value={email}
                    />
                  </Item>
                  <Item>
                    <Input
                      onChangeText={password => this.setState({ password })}
                      value={password}
                      secureTextEntry
                      autoCapitalize='none'
                      placeholder='Password'
                    />
                  </Item>
                  <Item picker last>
                    <Label>I want to:</Label>
                    <Picker
                      mode='dropdown'
                      iosIcon={<Icon name='arrow-down' />}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                      placeholder='I want to...'
                      itemStyle={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                      placeholderStyle={{ color: '#bfc6ea' }}
                      placeholderIconColor='#007aff'
                      selectedValue={accountType}
                      onValueChange={accountType => {
                        this.handleAccountTypeChange({ accountType })
                      }}
                    >
                      <Picker.Item label='Learn to surf' value='surfee' />
                      <Picker.Item label='Teach surfing' value='surfer' />
                    </Picker>
                  </Item>
                  {error && (
                    <Text style={{ color: 'red', textAlign: 'center' }}>
                      {error}
                    </Text>
                  )}
                  <Button
                    block
                    onPress={() => this.handleSignup()}
                    style={{
                      marginHorizontal: 5,
                      marginVertical: 10
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Sing Up</Text>
                  </Button>
                </Form>
                <Text
                  style={{ textAlign: 'center' }}
                  onPress={() => this.props.navigation.navigate('Login')}
                >
                  Login
                </Text>
              </Content>
            )}
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

export default connect(null, mapDispatchToProps)(Signup)
