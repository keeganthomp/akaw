import React, { Component } from 'react'
import { confrimSingup, signIn } from './auth'
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
  state = {
    error: null,
    verificationCode: null,
    isVerifyingUser: false
  }

  setUsername = ({ username }) => {
    this.setState({ username })
  }

  handleVerification = async () => {
    const { verificationCode } = this.state
    const { username, password, navigate, setUser } = this.props
    this.setState({ isVerifyingUser: true })
    try {
      await confrimSingup({ username, code: verificationCode })
      signIn({ username, password, navigate, setUser })
    } catch (error) {
      console.log('Error signing up:', error)
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

export default VerifySignup
