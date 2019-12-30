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
    const { navigation, surfer } = this.props
    navigation.navigate('SurferDetail', {
      surfer
    })
  }
  render () {
    const { surfer } = this.props
    const { firstName, lastName, hourlyRate, profileImagePath } = surfer
    const thumbnailImageSource = profileImagePath
      ? { uri: profileImagePath }
      : require('../assets/kells.jpg')
    return (
      <Card style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
        <CardItem button onPress={() => this.handleSurferSelect()}>
          <Left>
            <Thumbnail large source={thumbnailImageSource} />
          </Left>
          <Body style={{ alignContent: 'center', justifyContent: 'center' }}>
            <Text>
              {firstName} {lastName}
            </Text>
          </Body>
          <Right>
            <Text style={{ fontWeight: 'bold' }}>
              {hourlyRate ? `$${hourlyRate}/hour` : '$40/hour'}
            </Text>
          </Right>
        </CardItem>
      </Card>
    )
  }
}

export default SurferCard
