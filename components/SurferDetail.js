import React, { Component } from 'react'
import SurferCard from './SurferCard'
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
  Text
} from 'native-base'

class SurferDetail extends Component {
  static navigationOptions = {
    header: null
  }
  render () {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon style={{color: '#51F6BB'}} name='arrow-dropleft-circle' />
            </Button>
          </Left>
          <Body>
            <Title>Kelly Slater</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Surfer detail stuff....</Text>
        </Content>
      </Container>
    )
  }
}

export default SurferDetail
