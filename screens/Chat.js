import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { createChatMessage } from '../api/chatMessage'
import { getConversation } from '../api/chat'
import { addNotification } from '../api/notifications'
import { addMessageToChat } from '../actions/chatActions'
import socket from '../socket/'

class Chat extends React.Component {
  constructor (props) {
    super()
    this.state = {
      receiver: props.navigation.getParam('receiver'),
      sender: props.navigation.getParam('sender'),
      image: props.navigation.getParam('image'),
      chatId: null
    }
  }

  handleMessageSend = async ({ message }) => {
    const { receiver, sender, chatId } = this.state
    const { addMessageToChat } = this.props
    try {
      const {
        data: { newMessage, chat }
      } = await createChatMessage({
        chatId,
        text: message.text,
        sender,
        receiver
      })
      await addNotification({
        type: 'message',
        content: newMessage,
        userId: receiver.id
      })
      addMessageToChat({ chat, message: newMessage })
      socket.emit('messageSent', { sender, receiver, message: newMessage })
    } catch (error) {
      console.log('There was an error saving the chat message:', error)
    }
  }

  async componentDidMount () {
    const { receiver, sender } = this.state
    const {
      data: { chat }
    } = await getConversation({
      receiverId: receiver.id,
      senderId: sender.id
    })
    const { messages } = chat
    this.setState({ messages })
  }

  onSend (messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      message: ''
    }))
    const latestMessage = messages[0]
    this.handleMessageSend({ message: latestMessage })
  }

  render () {
    const { sender } = this.state
    return (
      <GiftedChat
        showUserAvatar
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: sender.id,
          name: sender.username,
          avatar: sender.profile.profilePicture
        }}
        onInputTextChanged={message => this.setState({ message })}
      />
    )
  }
}

const mapStateToProps = state => {
  const { user, chats } = state
  return { user, chats }
}

const mapDispatchToProps = {
  addMessageToChat
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
