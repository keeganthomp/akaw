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
  Thumbnail
} from 'native-base'
import { connect } from 'react-redux'

class ChatList extends Component {
  static navigationOptions = {
    header: null
  }

  handleChatOpen = async ({ receiver }) => {
    const { navigation, user } = this.props
    navigation.navigate('Chat', {
      sender: user,
      receiver
    })
  }

  render () {
    const { user, chats } = this.props
    const userId = user.id
    const doesUserHaveChats = chats && chats.length > 0
    return (
      <Container>
        <Header />
        <Content>
          <List key={1}>
            {doesUserHaveChats ? (
              chats.map((conversation, index) => {
                const otherUser =
                  conversation.user_one.id === userId
                    ? conversation.user_two
                    : conversation.user_one
                const latestMessage = conversation.messages[0]
                const userWhoSentLatestMessage =
                  latestMessage.user._id === conversation.user_two.id
                    ? conversation.user_two
                    : conversation.user_one
                const didCurrentUserSendLastMessage =
                  userWhoSentLatestMessage.id === userId
                return (
                  <ListItem
                    onPress={() => this.handleChatOpen({ receiver: otherUser })}
                    thumbnail
                    key={conversation.id + index}
                  >
                    <Left>
                      <Thumbnail
                        square
                        source={
                          otherUser.profile.profile_picture
                            ? {
                                uri: otherUser.profile.profile_picture
                              }
                            : require('../assets/default-avatar.png')
                        }
                      />
                    </Left>
                    <Body>
                      <Text>{otherUser.profile.username}</Text>
                      <Text note numberOfLines={1}>
                        {didCurrentUserSendLastMessage && 'you: '}
                        {latestMessage.text}
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        onPress={() =>
                          this.handleChatOpen({ receiver: otherUser })
                        }
                        transparent
                      >
                        <Text>View</Text>
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
  const { user, chats } = state
  return { user, chats }
}

export default connect(mapStateToProps)(ChatList)
