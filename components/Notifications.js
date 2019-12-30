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
import { sendMessage } from '../api/message'

class Notifications extends Component {
  state = {
    receivedMessages: []
  }
  static navigationOptions = {
    header: null
  }

  handleChatOpen = async ({ receiver }) => {
    const { navigation, user } = this.props
    navigation.navigate('Message', {
      sender: user,
      receiver,
      image: user.profileImagePath || null
    })
  }

  async componentDidMount () {
    const {
      user: { messages }
    } = this.props
    const groupedMessages = messages.reduce((acc, message) => {
      const { sender } = message
      const indexOfSenderMessages = acc.findIndex(
        existingMessage => existingMessage.sender === sender
      )
      const senderAlreadyHaveMessages = indexOfSenderMessages > -1
      if (senderAlreadyHaveMessages) {
        acc[indexOfSenderMessages].messages.push(message)
      } else {
        acc.push({
          sender,
          messages: [message]
        })
      }
      return acc
    }, [])
    this.setState({ receivedMessages: groupedMessages })
  }

  render () {
    const { receivedMessages } = this.state
    return (
      <Container>
        <Header />
        <Content>
          <List>
            {receivedMessages.map(receivedMessage => {
              const { sender, messages } = receivedMessage
              const latestMessage = messages[messages.length - 1]
              return (
                <ListItem
                  onPress={() => this.handleChatOpen({ receiver: sender })}
                  thumbnail
                  key={receivedMessage._id}
                >
                  <Left>
                    <Thumbnail
                      square
                      source={
                        latestMessage.image
                          ? { uri: latestMessage.image }
                          : require('../assets/kells.jpg')
                      }
                    />
                  </Left>
                  <Body>
                    <Text>{sender}</Text>
                    <Text note numberOfLines={1}>
                      {latestMessage.body}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      onPress={() => this.handleChatOpen({ receiver: sender })}
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
