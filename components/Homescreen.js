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
  Text,
  Title
} from 'native-base'
import { connect } from 'react-redux'

class HomeScreen extends Component {
  state = {
    user: null
  }
  static navigationOptions = {
    header: null
  }

  handleBookNow = () => {
    const { navigation } = this.props
    navigation.navigate('SurferScreen')
  }

  render () {
    const { user } = this.props
    console.log('USER IN HOMESCREEN', user)
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Title>Welcome</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            You currently have no upcoming lessons
          </Text>
          <Button
            onPress={() => this.handleBookNow()}
            style={{
              textAlign: 'center',
              marginTop: 10,
              backgroundColor: '#51F6BB'
            }}
          >
            <Text style={{ textAlign: 'center' }}>Book Now</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps)(HomeScreen)
