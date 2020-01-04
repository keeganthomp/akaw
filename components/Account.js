import React, { Component } from 'react'
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Right,
  Body,
  Title,
  Text,
  Form,
  Item,
  Input,
  Toast,
  Label,
  Icon
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Image, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../authentication/auth'
import NumericInput from 'react-native-numeric-input'
import { updateUserFromUsername } from 'surfingit/api/user'
import { uploadImageOnS3 } from 'surfingit/api/s3'
import {
  getCameraPermisions,
  getCameraRollPermisions,
  openImageSelector,
  openCamera
} from '../helpers/camera'
import { setUser } from '../actions/userActions'
import { bindActionCreators } from 'redux'

class Account extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super()
    this.state = {
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      email: props.user.email || '',
      profileImagePath: props.user.profileImagePath || null,
      accountType: props.user.accountType,
      image: null,
      hourlyRate: props.user.hourlyRate
        ? props.user.hourlyRate.toString()
        : null
    }
  }
  handleLogout = () => {
    const { navigation } = this.props
    const navigate = navigation.navigate
    logout({ navigate })
  }

  setAndSaveProfileImage = async ({ image, imageName }) => {
    const { user, setUser } = this.props
    const { uri } = image
    const username = user.username
    this.setState({ image: uri })
    const { body: response } = await uploadImageOnS3({
      uri,
      username,
      imageName
    })
    const { location } = response.postResponse
    setUser({
      user: {
        ...user,
        profileImagePath: location
      }
    })
    updateUserFromUsername({
      username,
      data: {
        profileImagePath: location
      }
    })
    Toast.show({
      text: 'Profile Picture Updated',
      buttonText: 'Okay'
    })
  }

  initializeImageSelect = async () => {
    const cameraAccessStatus = await getCameraPermisions()
    const cameraRollAccessStatus = await getCameraRollPermisions()
    const canAccessCameraRoll = cameraRollAccessStatus === 'granted'
    const canAccessCamera = cameraAccessStatus === 'granted'
    if (canAccessCameraRoll) {
      openImageSelector({ callback: this.setAndSaveProfileImage })
    }
  }
  handleUserUpdate = async () => {
    const { firstName, lastName, hourlyRate } = this.state
    const { user } = this.props
    const hasDataChanged =
      (firstName && user.firstName !== firstName) ||
      (lastName && user.lastName !== lastName) ||
      (hourlyRate && user.hourlyRate !== hourlyRate)
    const userData = {
      firstName,
      lastName,
      hourlyRate
    }
    const { username } = user
    if (hasDataChanged) {
      await updateUserFromUsername({ username, data: userData })
      Toast.show({
        text: 'Profile Updated!',
        buttonText: 'Okay'
      })
    } else {
      Toast.show({
        text: 'Nothing has changed',
        buttonText: 'Okay'
      })
    }
  }
  render () {
    const {
      firstName,
      lastName,
      email,
      image,
      profileImagePath,
      hourlyRate
    } = this.state
    const { user } = this.props
    const isSurfer = user.accountType === 'surfer'
    const profileImageSource = (image || profileImagePath) && {
      uri: image || profileImagePath
    }
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Account</Title>
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
              onPress={() => this.initializeImageSelect()}
            >
              <Image
                source={
                  profileImageSource || require('../assets/default-avatar.png')
                }
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 200 / 2,
                  marginTop: 15
                }}
              />
            </Row>
            <Form
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Item stackedLabel style={{ width: 300, marginRight: 10 }}>
                <Label>First Name</Label>
                <Input
                  onChangeText={firstName => this.setState({ firstName })}
                  placeholder='First Name'
                  value={firstName}
                  autoCapitalize='none'
                  style={{ textAlign: 'center' }}
                />
              </Item>
              <Item stackedLabel style={{ width: 300, marginRight: 10 }}>
                <Label>Last Name</Label>

                <Input
                  onChangeText={lastName => this.setState({ lastName })}
                  value={lastName}
                  placeholder='Last Name'
                  autoCapitalize='none'
                  placeholderText
                  style={{ textAlign: 'center' }}
                />
              </Item>
              <Item
                success
                style={{ width: 300, marginRight: 10, marginTop: 15 }}
              >
                <Input
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  placeholder='example@example.com'
                  autoCapitalize='none'
                  placeholderText
                  style={{ textAlign: 'center' }}
                  disabled
                  keyboardType='email-address'
                />
                <Icon name='checkmark-circle' />
              </Item>
              {isSurfer && (
                <Item stackedLabel style={{ width: 300, marginRight: 10 }}>
                  <Label>Hourly Rate</Label>
                  {console.log('HOURLY RATE', this.state.hourlyRate)}
                  <TextInput
                    onChangeText={hourlyRate =>
                      this.setState({ hourlyRate: hourlyRate.replace('$', '') })
                    }
                    value={`$${hourlyRate || ''}`}
                    placeholder={'25'}
                    autoCapitalize='none'
                    placeholderText
                    style={{ textAlign: 'center' }}
                    keyboardType='number-pad'
                  />
                </Item>
              )}
            </Form>
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
                onPress={() => this.handleUserUpdate()}
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10,
                  backgroundColor: '#51F6BB'
                }}
              >
                <Text style={{ textAlign: 'center' }}>Save</Text>
              </Button>
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
                danger
                onPress={() => this.handleLogout()}
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10
                }}
              >
                <Text style={{ textAlign: 'center' }}>Logout</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Account)
