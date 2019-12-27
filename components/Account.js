import React, { Component } from 'react'
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Right,
  Body,
  Icon,
  Title,
  Text,
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import { logout } from '../authentication/auth'

class Account extends Component {
  static navigationOptions = {
    header: null
  }
  handleLogout = () => {
    const { navigation } = this.props
    const navigate = navigation.navigate
    logout({ navigate })
  }
  render () {
    const { navigation, user } = this.props
    console.log('USER IN ACCOUNT', user)
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Account</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Grid>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200
              }}
            >
              <Thumbnail large source={require('../assets/kells.jpg')} />
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text>First Name</Text>
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text>Last Name</Text>
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button
                block
                onPress={() => this.handleLogout()}
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10,
                  backgroundColor: '#51F6BB'
                }}
              >
                <Text style={{ textAlign: 'center' }}>Logout</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps)(Account)
