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
  Toast
} from 'native-base'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { sendMessage } from '../api/message'

class Message extends Component {
  constructor (props) {
    super()
    this.state = {
      receiver: props.navigation.getParam('receiver'),
      sender: props.navigation.getParam('sender'),
      image: props.navigation.getParam('image'),
      message: ''
    }
  }
  static navigationOptions = {
    header: null
  }

  handleMessageSend = async () => {
    const { message, receiver, sender, image } = this.state
    await sendMessage({ message, receiver, sender, image })
    Toast.show({
      text: 'Message Sent',
      buttonText: 'Okay'
    })
  }

  render () {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon style={{ color: '#51F6BB' }} name='arrow-dropleft-circle' />
            </Button>
          </Left>
          <Body>
            <Title>Send a message</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content padder>
          <Form>
            <Textarea
              onChangeText={message => this.setState({ message })}
              style={{ borderRadius: 10 }}
              rowSpan={5}
              bordered
              value={this.state.message}
              placeholder='What do you want to say?'
            />
          </Form>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10
            }}
          >
            <Button bordered danger>
              <Icon name='trash' />
            </Button>
            <Button bordered onPress={() => this.handleMessageSend()}>
              <Icon name='send' />
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { user, surfer } = state
  return { user, surfer }
}

export default connect(mapStateToProps)(Message)
