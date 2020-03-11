import React, { Component } from 'react'
import { View } from 'react-native'
import { signup } from '../../authentication'
import { createUser } from 'surfingit/api/user'
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
  Label,
  Header,
  Title
} from 'native-base'
import { bindActionCreators } from 'redux'
import { setUser } from '../../actions/userActions'
import { setSurfers } from '../../actions/surferActions'
import { primaryColor } from '../../constants/colors'

import { connect } from 'react-redux'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    error: null,
    accountType: 'surfee',
    isSigningUp: false,
    error: null
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
    const { setUser, navigation } = this.props
    const { username, password, email, accountType } = this.state
    const newUserPayload = {
      email,
      accountType,
      username,
      password
    }
    this.setState({ isSigningUp: true })
    try {
      // make sure user can be created in db (all fields are unique)
      const {
        data: { user: signedUpUser }
      } = await createUser(newUserPayload)
      // signing up user in AWS cognito
      await signup(newUserPayload)
      setUser({ user: { ...signedUpUser } })
      navigation.navigate('SignupVerify')
      this.setState({ isSigningUp: false })
    } catch (error) {
      const { response } = error
      if (response) {
        const {
          data: { error: errorFromApi }
        } = response
        this.setState({ error: errorFromApi })
      } else {
        this.setState({ error })
      }
      this.setState({ isSigningUp: false })
    }
  }

  render () {
    const {
      username,
      password,
      error,
      email,
      isSigningUp,
      accountType
    } = this.state
    return (
      <Container style={{ backgroundColor: '#f6f6f6' }}>
        {isSigningUp ? (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <Spinner color={primaryColor} />
            <Text style={{ textAlign: 'center' }}>Signing Up</Text>
          </Content>
        ) : (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <Content
              contentContainerStyle={{
                justifyContent: 'center',
                flex: 1,
                marginHorizontal: 20
              }}
            >
              <Item stackedLabel>
                <Label>Username</Label>
                <Input
                  onChangeText={username => this.setState({ username })}
                  value={username}
                  autoCapitalize='none'
                />
              </Item>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input
                  onChangeText={email => this.setState({ email })}
                  autoCapitalize='none'
                  value={email}
                />
              </Item>
              <Item stackedLabel>
                <Label>Password</Label>
                <Input
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  secureTextEntry
                  autoCapitalize='none'
                />
              </Item>
              <Item stackedLabel picker>
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
                    // width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginHorizontal: 20
                  }}
                  headerBackButtonText='back'
                  renderHeader={() => (
                    <Header style={{ display: 'flex', alignItems: 'center' }}>
                      {/* <Button transparent>
                        <Text>Custom Back</Text>
                      </Button> */}
                      <Title>Custom Header</Title>
                    </Header>
                  )}
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
                  {error.message || 'Something went wrong'}
                </Text>
              )}
              <Button
                block
                onPress={() => this.handleSignup()}
                style={{
                  marginHorizontal: 5,
                  marginVertical: 28,
                  backgroundColor: primaryColor
                }}
              >
                <Text style={{ textAlign: 'center' }}>Sing Up</Text>
              </Button>
            </Content>
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
      setSurfers
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Signup)
