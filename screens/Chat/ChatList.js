import React, { Component } from 'react'
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Right,
  Body,
  Text,
  List,
  ListItem,
  Thumbnail,
  Badge
} from 'native-base'
import { connect } from 'react-redux'
import { primaryColor, backgroundColor } from '../../constants/colors'

class ChatList extends Component {
  static navigationOptions = {
    header: null
  }

  handleChatOpen = async ({ receiver, chatId, notifications }) => {
    console.log('CHAT ID222', chatId)
    const { navigation, user } = this.props
    navigation.navigate('Chat', {
      sender: user,
      receiver,
      chatId,
      notifications
    })
  }

  getNotificationsByChat = ({ conversation }) => {
    const { notifications } = this.props
    const chatId = conversation.id
    const reducedNotifications = notifications.filter(
      notificaiton =>
        notificaiton.type === 'message' &&
        notificaiton.content.chatId === chatId &&
        !notificaiton.hasBeenSeen
    )
    return reducedNotifications
  }

  render () {
    const { user, chats } = this.props
    const userId = user.id
    const doesUserHaveChats = chats && chats.length > 0
    return (
      <Container style={{ backgroundColor }}>
        <Content>
          <List key={userId}>
            {doesUserHaveChats ? (
              chats.map((conversation, index) => {
                const { last_message } = conversation
                const notifications = this.getNotificationsByChat({
                  conversation
                })
                const notificationCount = notifications.length
                const otherUser =
                  conversation.user_one.id === userId
                    ? conversation.user_two
                    : conversation.user_one
                const userWhoSentLatestMessage =
                  last_message &&
                  last_message.user._id === conversation.user_two.id
                    ? conversation.user_two
                    : conversation.user_one
                const didCurrentUserSendLastMessage =
                  userWhoSentLatestMessage.id === userId
                return (
                  <ListItem
                    onPress={() =>
                      this.handleChatOpen({
                        receiver: otherUser,
                        chatId: conversation.id,
                        notifications
                      })
                    }
                    thumbnail
                    key={conversation.id}
                  >
                    <Left>
                      <Thumbnail
                        source={
                          otherUser.profile.profile_picture
                            ? {
                                uri: otherUser.profile.profile_picture
                              }
                            : require('../../assets/default-avatar.png')
                        }
                      />
                      {notificationCount > 0 && (
                        <Badge
                          style={{
                            position: 'absolute',
                            left: 40,
                            top: -4,
                            height: 20,
                            width: 20,
                            paddingRight: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0
                          }}
                        >
                          <Text style={{ fontSize: 12 }}>
                            {notificationCount}
                          </Text>
                        </Badge>
                      )}
                    </Left>
                    <Body>
                      <Text>{otherUser.profile.username}</Text>
                      <Text note numberOfLines={1}>
                        {didCurrentUserSendLastMessage && 'you: '}
                        {last_message && last_message.text}
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        onPress={() =>
                          this.handleChatOpen({
                            receiver: otherUser,
                            chatId: conversation.id,
                            notifications
                          })
                        }
                        transparent
                      >
                        <Text style={{ color: primaryColor }}>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                )
              })
            ) : (
              <ListItem>
                <Text>No Chats Available</Text>
              </ListItem>
            )}
          </List>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { user, chats, notifications } = state
  return { user, chats: chats.chatList, notifications }
}

export default connect(mapStateToProps)(ChatList)
