import React, { Component } from 'react'
import { Header, Button, Right, Left } from 'native-base'
import { primaryColor, backgroundColor } from '../../constants/colors'
import { Entypo } from '@expo/vector-icons'

export default class ChatHeader extends Component {
  render () {
    return (
      <Header style={{ borderBottomWidth: 0, backgroundColor }}>
        <Left>
          <Button transparent onPress={() => this.props.goBack()}>
            <Entypo name='chevron-small-left' size={42} color={primaryColor} />
          </Button>
        </Left>
        <Right />
      </Header>
    )
  }
}
