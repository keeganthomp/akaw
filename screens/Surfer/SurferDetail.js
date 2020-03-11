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
  Title,
  Text
} from 'native-base'
import { StyleSheet } from 'react-native'
import { Row, Grid } from 'react-native-easy-grid'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { getConversation } from '../../api/chat'
import { primaryColor, backgroundColor } from '../../constants/colors'
import { Entypo } from '@expo/vector-icons'

class SurferDetail extends Component {
  constructor (props) {
    super()
    this.state = {
      surfer: props.navigation.getParam('surfer')
    }
  }
  static navigationOptions = {
    header: null
  }
  handleMessageOpen = async () => {
    const { navigation, user } = this.props
    const { surfer } = this.state
    const {
      data: { chat }
    } = await getConversation({
      receiverId: surfer.id,
      senderId: user.id
    })
    navigation.navigate('Chat', {
      sender: user,
      receiver: surfer,
      image: user.profileImagePath || null,
      chatId: chat.id
    })
  }

  render () {
    const { navigation } = this.props
    const { surfer } = this.state
    const { profile } = surfer
    const {
      firstName,
      lastName,
      hourlyRate,
      profilePicture,
      yearsOfExperience,
      equipmentOffered
    } = profile
    const doesOfferEquipment = equipmentOffered && equipmentOffered.length > 0
    return (
      <Container style={{ backgroundColor }}>
        <Header style={{ borderBottomWidth: 0, backgroundColor }}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Entypo
                name='chevron-small-left'
                size={42}
                color={primaryColor}
              />
            </Button>
          </Left>
          <Right />
        </Header>
        <Content>
          <Grid>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200
              }}
            >
              <Image
                source={
                  profilePicture
                    ? { uri: profilePicture }
                    : require('../../assets/default-avatar.png')
                }
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 200 / 2,
                  marginTop: 15
                }}
              />
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 75
              }}
            >
              <Text style={styles.labelText}>Name:</Text>
              <Text>
                {firstName} {lastName}
              </Text>
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 75
              }}
            >
              <Text style={styles.labelText}>Years of Experience:</Text>
              <Text>{yearsOfExperience}</Text>
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 75
              }}
            >
              <Text style={styles.labelText}>Hourly Rate:</Text>
              <Text>{hourlyRate ? `$${hourlyRate}/hour` : '--'}</Text>
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 75
              }}
            >
              <Text style={styles.labelText}>Equipment Offered:</Text>
              <Text>
                {doesOfferEquipment
                  ? equipmentOffered.join(', ')
                  : 'No Equipment Offered'}
              </Text>
            </Row>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 75
              }}
            >
              <Text style={styles.labelText}>Location:</Text>
              <Text>92013 (San Diego)</Text>
            </Row>

            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200
              }}
            >
              <Button
                block
                onPress={() => this.handleMessageOpen()}
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10,
                  backgroundColor: primaryColor
                }}
              >
                <Icon style={{ color: '#fff' }} name='mail' />
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin'
  },
  labelText: {
    fontSize: 15,
    marginRight: 10,
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

export default connect(mapStateToProps)(SurferDetail)
