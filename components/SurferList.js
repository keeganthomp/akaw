import React, { Component } from "react";
import SurferCard from "./SurferCard";
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
} from "native-base";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          {/* <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left> */}
          <Body>
            <Title>Select a surfer</Title>
          </Body>
          {/* <Right>
            <Button transparent>
              <Icon name="person" />
            </Button>
          </Right> */}
        </Header>
        <Content>
          <SurferCard navigation={navigation}/>
          <SurferCard />
          <SurferCard />
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
