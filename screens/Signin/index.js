import React, { Component } from 'react'
import { Container, Content, Tab, Tabs } from 'native-base'
import Login from '../Login'
import SignUp from '../Signup'
import { primaryColor, backgroundColor } from '../../constants/colors'

const activeTextStyle = {
  color: primaryColor,
  borderBottomColor: primaryColor
}
const activeTabStyle = {
  borderColor: primaryColor
}

const tabBarUnderlineStyle = {
  backgroundColor: primaryColor
}

export default class Signin extends Component {
  render () {
    return (
      <Container style={{ backgroundColor }}>
        <Content padder={false}>
          <Tabs tabBarUnderlineStyle={tabBarUnderlineStyle}>
            <Tab
              activeTabStyle={activeTabStyle}
              activeTextStyle={activeTextStyle}
              heading='Log in'
            >
              <Login {...this.props} />
            </Tab>
            <Tab
              activeTabStyle={activeTabStyle}
              activeTextStyle={activeTextStyle}
              heading='Sign up'
            >
              <SignUp {...this.props} />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    )
  }
}
