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
import { primaryColor, backgroundColor } from '../../constants/colors'

class HomeScreen extends Component {
  state = {
    user: null
  }
  static navigationOptions = {
    // header: null
  }

  handleBookNow = () => {
    const { navigation } = this.props
    navigation.navigate('SurferScreen')
  }

  render () {
    return (
      <Container style={{ backgroundColor }}>
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
              backgroundColor: primaryColor
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
  const { user, surfer } = state
  return { user, surfer }
}

export default connect(mapStateToProps)(HomeScreen)
