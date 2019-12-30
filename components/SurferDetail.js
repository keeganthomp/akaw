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
  handleMessageOpen = () => {
    const { navigation, user } = this.props
    const { surfer } = this.state
    navigation.navigate('Message', {
      sender: user,
      receiver: surfer,
      image: user.profileImagePath || null
    })
  }

  render () {
    const { navigation } = this.props
    const { surfer } = this.state
    const { firstName, lastName, hourlyRate, profileImagePath } = surfer
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon style={{ color: '#51F6BB' }} name='arrow-dropleft-circle' />
            </Button>
          </Left>
          <Body>
            <Title>
              {firstName} {lastName}
            </Title>
          </Body>
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
                  profileImagePath
                    ? { uri: profileImagePath }
                    : require('../assets/kells.jpg')
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
              <Text style={styles.labelText}>Location:</Text>
              <Text>92013 (San Diego)</Text>
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
                height: 200
              }}
            >
              <Button
                block
                onPress={() => this.handleMessageOpen()}
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10,
                  backgroundColor: '#51F6BB'
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
