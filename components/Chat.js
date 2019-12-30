import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { getAllMessagesForSender } from '../api/message'
import { sendMessage } from '../api/message'

class Chat extends React.Component {
  constructor (props) {
    super()
    this.state = {
      receiver: props.navigation.getParam('receiver'),
      sender: props.navigation.getParam('sender'),
      image: props.navigation.getParam('image'),
      messages: []
    }
  }

  handleMessageSend = async () => {
    const { message, receiver, sender, image } = this.state
    await sendMessage({
      message,
      receiver: receiver.username || receiver,
      sender: sender.username || sender,
      image
    })
  }

  async componentDidMount () {
    const { receiver, sender } = this.state
    const {
      data: { messages }
    } = await getAllMessagesForSender({
      receiver: receiver.username || receiver,
      sender: sender.username || sender
    })
    const formattedMessages = messages.reverse().map(message => {
      return {
        _id: message._id,
        text: message.body,
        createdAt: message.createdAt,
        user: {
          _id: message.sender,
          name: message.sender,
          avatar: message.image
        }
      }
    })
    this.setState({ messages: formattedMessages })
  }

  onSend (messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      message: ''
    }))
    this.handleMessageSend()
  }

  render () {
    const { sender } = this.state
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: sender.username || sender
        }}
        onInputTextChanged={message => this.setState({ message })}
      />
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps)(Chat)
