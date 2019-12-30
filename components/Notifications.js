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
  static navigationOptions = {
    header: null
  }

  handleMessageSend = async () => {
    const { message, receiver, sender } = this.state
    await sendMessage({ message, receiver, sender })
    Toast.show({
      text: 'Message Sent',
      buttonText: 'Okay'
    })
  }

  render () {
    const {
      user: { messages }
    } = this.props
    console.log('MESSAGES', messages)
    return (
      <Container>
        <Header />
        <Content>
          <List>
            {messages.map(message => {
              const { image, body, sender } = message
              return (
                <ListItem thumbnail key={message._id}>
                  <Left>
                    <Thumbnail
                      square
                      source={
                        image ? { uri: image } : require('../assets/kells.jpg')
                      }
                    />
                  </Left>
                  <Body>
                    <Text>{sender}</Text>
                    <Text note numberOfLines={1}>
                      {body}
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent>
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
