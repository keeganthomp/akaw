import React, { Component } from 'react'
import { connect } from 'react-redux'
import { confrimSingup } from '../authentication/auth'
import { verifyUser } from 'surfingit/api/user'
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

class VerifySignup extends Component {
  constructor () {
    super()
    this.state = {
      error: null,
      verificationCode: null,
      isVerifyingUser: false
    }
  }

  setUsername = ({ username }) => {
    this.setState({ username })
  }

  handleVerification = async () => {
				const { user: { username }, navigation } = this.props
				const userNameFromLogin = this.props.navigation.getParam('username')
    const { verificationCode } = this.state
    this.setState({ isVerifyingUser: true })
    try {
						await confrimSingup({ username: username || userNameFromLogin, code: verificationCode })
						await verifyUser({ username: username || userNameFromLogin })
						navigation.navigate('Login')
      this.setState({ isVerifyingUser: false })
    } catch (error) {
      console.log('Error verifying code:', error)
      this.setState({ isVerifyingUser: false })
    }
  }

  render () {
    const { error, verificationCode, isVerifyingUser } = this.state
    return (
      <Container>
        {isVerifyingUser ? (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <Spinner color='#51F6BB' />
            <Text style={{ textAlign: 'center' }}>Verifying User</Text>
          </Content>
        ) : (
          <Content
            contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
          >
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>
              Please check your email for a verification code
            </Text>
            <Form>
              <Item>
                <Input
                  onChangeText={verificationCode =>
                    this.setState({ verificationCode })
                  }
                  placeholder='Verification Code'
                  value={verificationCode}
                  autoCapitalize='none'
                  keyboardType='number-pad'
                />
              </Item>
              {error && <Text style={{ color: 'red' }}>{error}</Text>}
              <Button
                onPress={() => this.handleVerification()}
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10
                }}
              >
                <Text>Verify</Text>
              </Button>
            </Form>
          </Content>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps)(VerifySignup)
