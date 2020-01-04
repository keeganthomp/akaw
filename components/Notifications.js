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
  Title,
  Textarea,
  Form,
  Toast,
  List,
  ListItem,
  Thumbnail
} from 'native-base'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { sendMessage } from '../api/conversation'

class Notifications extends Component {
  state = {
    receivedMessages: []
  }
  static navigationOptions = {
    header: null
  }

  handleChatOpen = async ({ receiver }) => {
    const { navigation, user } = this.props
    navigation.navigate('Chat', {
      sender: user,
      receiver,
      image: user.profileImagePath || null
    })
  }

  render () {
    const {
      user: { conversations, username }
    } = this.props
    return (
      <Container>
        <Header />
        <Content>
          <List>
            {conversations.map((conversation, key) => {
              const chatParticipant = conversation.between.filter(
                participant => participant !== username
              )[0]
              const { lastMessage } = conversation
              return (
                <ListItem
                  onPress={() =>
                    this.handleChatOpen({ receiver: chatParticipant })
                  }
                  thumbnail
                  key={key}
                >
                  <Left>
                    <Thumbnail
                      square
                      source={
                        lastMessage.image
                          ? { uri: lastMessage.image }
                          : require('../assets/default-avatar.png')
                      }
                    />
                  </Left>
                  <Body>
                    <Text>{lastMessage.sender}</Text>
                    <Text note numberOfLines={1}>
                      {lastMessage.body}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      onPress={() =>
                        this.handleChatOpen({ receiver: chatParticipant })
                      }
                      transparent
                    >
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps)(Notifications)
