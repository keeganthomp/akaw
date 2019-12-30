import React, { Component } from 'react'
import SurferCard from './SurferCard'
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Right,
  Body,
  Icon,
  Title
} from 'native-base'
import { connect } from 'react-redux'

class SurferList extends Component {
  constructor (props) {
    super()
    this.state = {
      surfers: []
    }
  }
  static navigationOptions = {
    header: null
  }
  render () {
    const { navigation, surfer } = this.props
    const { listOfSurfers } = surfer
    return (
      <Container>
        <Header>
          <Body>
            <Title>Select a surfer</Title>
          </Body>
        </Header>
        <Content>
          {listOfSurfers.map(registeredSurfer => (
            <SurferCard
              key={registeredSurfer._id}
              surfer={registeredSurfer}
              navigation={navigation}
            />
          ))}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { surfer } = state
  return { surfer }
}

export default connect(mapStateToProps)(SurferList)
