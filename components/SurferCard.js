import React, { Component } from 'react'
import { Image } from 'react-native'
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail
} from 'native-base'

class SurferCard extends Component {
  handleSurferSelect = () => {
    const { navigation } = this.props
    console.log('navigation', navigation)
    navigation.navigate('SurferDetail')
  }
  render () {
    return (
      <Card style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
        <CardItem button onPress={() => this.handleSurferSelect()}>
          <Left>
            <Thumbnail large source={require('../assets/kells.jpg')} />
          </Left>
          <Body style={{ alignContent: 'center', justifyContent: 'center' }}>
            <Text>Kelly Slater</Text>
          </Body>
          <Right>
            <Text style={{ fontWeight: 'bold' }}>$40/hour</Text>
          </Right>
        </CardItem>
      </Card>
    )
  }
}

export default SurferCard
