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
				const { surfer: { profile } } = this.props
    const {
      firstName,
      lastName,
      hourlyRate,
      profilePicture,
      username
    } = profile
    const surferDisplayName =
      firstName && lastName ? `${firstName} ${lastName}` : username
    const thumbnailImageSource = profilePicture
      ? { uri: profilePicture } 
      : require('../assets/default-avatar.png')
    return (
      <Card style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
        <CardItem button onPress={() => this.handleSurferSelect()}>
          <Left>
            <Thumbnail large source={thumbnailImageSource} />
          </Left>
          <Body style={{ alignContent: 'center', justifyContent: 'center' }}>
            <Text>{surferDisplayName}</Text>
          </Body>
          <Right>
            <Text style={{ fontWeight: 'bold' }}>
              {hourlyRate ? `$${hourlyRate}/hour` : '--/hour'}
            </Text>
          </Right>
        </CardItem>
      </Card>
    )
  }
}

export default SurferCard
