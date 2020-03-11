import React from 'react'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { createChatMessage } from '../../api/chatMessage'
import { getConversation } from '../../api/chat'
import { addNotification, updateNotification } from '../../api/notifications'
import { Text, Container } from 'native-base'
import { setNotifications } from '../../actions/notificaitonActions'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import {
  addMessageToConversation,
  addConversation,
  setUserIsTyping,
  isFetchingConversation
} from '../../actions/chatActions'
import {
  emitMessageSent,
  emitTypingUser,
  emitStopTypingUser
} from '../../socket'
import _ from 'lodash'
import Typing from './TypingAnimation'
import { primaryColor, backgroundColor } from '../../constants/colors'
import { KeyboardAvoidingView } from 'react-native'

import ChatHeader from './ChatHeader'

class Chat extends React.Component {
  constructor (props) {
    super()
    this.state = {
      receiver: props.navigation.getParam('receiver'),
      sender: props.navigation.getParam('sender'),
      messages: props.messages || [],
      message: '',
      chatId: null
    }
    this.typingTimer
    this.doneTypingInterval = 3000
    this.setUserIsTyping = _.throttle(() => {
      emitTypingUser({
        typingUser: this.state.sender,
        receivingUser: this.state.receiver,
        chatId: this.state.chatId
      })
      this.typingTimer = setTimeout(
        this.stopUserTyping,
        this.doneTypingInterval
      )
    }, 2000)
    this.stopUserTyping = () => {
      emitStopTypingUser({
        typingUser: this.state.sender,
        receivingUser: this.state.receiver,
        chatId: this.state.chatId
      })
    }
  }

  async componentDidMount () {
    const { receiver, sender } = this.state
    const {
      addConversation,
      isFetchingConversation,
      setNotifications,
      currentConversation
    } = this.props
    const notifications = this.props.navigation.getParam('notifications')
    const notificationIds =
      notifications && notifications.map(notification => notification.id)
    try {
      if (notificationIds) {
        const {
          data: { notifications: updatedNotifications }
        } = notificationIds && (await updateNotification({ notificationIds }))
        setNotifications({ notifications: updatedNotifications })
      }
      if (!currentConversation) {
        isFetchingConversation()
        const {
          data: { chat }
        } = await getConversation({
          receiverId: receiver.id,
          senderId: sender.id
        })
        addConversation({ conversation: chat })
        this.setState({ chatId: chat.id })
      }
    } catch (error) {
      console.log('There was an error getting the conversation', error)
    }
  }

  handleMessageSend = async ({ message }) => {
    const { receiver, sender } = this.state
    try {
      const {
        data: { newMessage, chat }
      } = await createChatMessage({
        text: message.text,
        sender,
        receiver
      })

      const { data: notification } = await addNotification({
        type: 'message',
        content: newMessage,
        userId: receiver.id
      })
      emitMessageSent({
        conversation: chat,
        sender,
        receiver,
        newMessage,
        notification
      })
    } catch (error) {
      console.log('There was an error saving the chat message:', error)
    }
		}
		
		customtInputToolbar = props => {
			return (
					<InputToolbar
							{...props}
							containerStyle={{
									marginLeft: 10,
									marginRight: 10,
									borderRadius: 10,
									borderTopWidth: 0,
							}}
					/>
			);
	};

  onSend (messages = []) {
    const {
      addMessageToConversation,
      currentConversation,
      conversations
    } = this.props
    const conversationToUpdate =
      currentConversation || conversations[this.state.chatId]
    this.setState({
      // messages: GiftedChat.append(previousState.messages, messages),
      message: ''
    })
    emitStopTypingUser({
      typingUser: this.state.sender,
      receivingUser: this.state.receiver,
      chatId: this.state.chatId
    })
    const latestMessage = messages[0]
    addMessageToConversation({
      conversation: conversationToUpdate,
      message: latestMessage
    })

    this.handleMessageSend({ message: latestMessage })
  }

  handleInputChange = message => {
    if (message) {
      this.setUserIsTyping()
    }
    this.setState({ message })
  }

  renderFooter = props => {
    const { chatId } = this.state
    const { isUserTyping } = this.props
    // const thisConversation = conversations[this.state.chatId]
    if (isUserTyping) {
      return <Typing key={chatId} transformation='opacity' />
    } else {
      return null
    }
  }

  renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: primaryColor
          }
        }}
      />
    )
  }

  render () {
    const { sender } = this.state
    const {
      isUserTyping,
      isFetchingChat,
      messages,
      message,
      currentConversation
    } = this.props
    if (!isFetchingChat && currentConversation) {
      return (
        <Container style={{ backgroundColor, flex: 1 }}>
          <ChatHeader goBack={this.props.navigation.goBack} />
          <GiftedChat
										style={{ marginTop: 50 }}
            showUserAvatar
            bottomOffset={getBottomSpace()}
            alwaysShowSend
            text={message}
            messages={messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: sender.id,
              name: sender.username,
              avatar: sender.profile.profilePicture
            }}
            renderFooter={this.renderFooter}
            onInputTextChanged={this.handleInputChange}
            extraData={{ isUserTyping, messages: messages }}
            renderLoading={() => <Text>Loading chat...</Text>}
												renderBubble={this.renderBubble}
												renderInputToolbar={props => this.customtInputToolbar(props)}
          />
        </Container>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const chatId = ownProps.navigation.getParam('chatId')
  const { user, chats } = state
  const currentConversation = chats.conversations[chatId]
  return {
    user,
    isFetchingChat: chats.isFetching,
    currentConversation,
    messages: currentConversation && currentConversation.messages,
    isUserTyping: currentConversation && currentConversation.isUserTyping
  }
}

const mapDispatchToProps = {
  addMessageToConversation,
  addConversation,
  setUserIsTyping,
  isFetchingConversation,
  setNotifications
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
