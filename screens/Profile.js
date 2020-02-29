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
  Icon,
  CheckBox,
  Textarea,
  ListItem
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Image, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../authentication/auth'
import { updateProfile } from 'surfingit/api/profile'
import { uploadImageOnS3 } from 'surfingit/api/s3'
import {
  getCameraPermisions,
  getCameraRollPermisions,
  openImageSelector,
  openCamera,
  askCameraRollPermisions
} from '../helpers/camera'
import { setUser, clearUserData } from '../actions/userActions'
import { bindActionCreators } from 'redux'

const EQUIPMENT = [
  {
    label: 'Surfboard',
    name: 'surfboard'
  },
  {
    label: 'Wetsuit',
    name: 'wetsuit'
  }
]

const BEACHES = [
  {
    label: 'Ocean Beach',
    name: 'oceanBeach'
  },
  {
    label: 'Del Mar',
    name: 'delMar'
  }
]

class Profile extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    const { profile } = props.user
    super()
    this.state = {
      email: props.user.email || '',
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      yearsOfExperience: profile.yearsOfExperience || null,
      profilePicture: profile.profilePicture || null,
      equipmentOffered: profile.equipmentOffered || [],
      preferredBeaches: profile.preferredBeaches || [],
      equipmentNeeded: profile.equipmentNeeded || [],
      about: profile.about || '',
      accountType: profile.accountType,
      cprCertified: profile.cprCertified || false,
      hourlyRate: profile.hourlyRate ? profile.hourlyRate.toString() : null
    }
  }
  handleLogout = () => {
    const { navigation, clearUserData } = this.props
    const navigate = navigation.navigate
    logout({ navigate, clearUserData })
  }

  setAndSaveProfileImage = async ({ image, imageName }) => {
    const { user, setUser } = this.props
    const { id: userId, profile: existingProfile } = user
    const { uri } = image
    const username = user.username
    this.setState({ profilePicture: uri })
    try {
      const { body: response } = await uploadImageOnS3({
        uri,
        username,
        imageName
      })
      const { location } = response.postResponse
      setUser({
        user
      })
      await updateProfile({
        userId,
        profile: {
          ...existingProfile,
          profilePicture: location
        }
      })
      Toast.show({
        text: 'Profile Picture Updated',
        buttonText: 'Okay'
      })
    } catch (err) {
      console.log('Error updating profile image:', err)
    }
  }

  handleEquipmentOfferedSelect = ({ equipment }) => {
    const { equipmentOffered } = this.state
    const isSelected = equipmentOffered.includes(equipment)
    if (isSelected) {
      const updatedEquipment = equipmentOffered.filter(
        existingEquipment => existingEquipment !== equipment
      )
      this.setState({ equipmentOffered: updatedEquipment })
    } else {
      this.setState({ equipmentOffered: [...equipmentOffered, equipment] })
    }
  }

  handleEquipmentNeededSelect = ({ equipment }) => {
    const { equipmentNeeded } = this.state
    const isSelected = equipmentNeeded.includes(equipment)
    if (isSelected) {
      const updatedEquipment = equipmentNeeded.filter(
        existingEquipment => existingEquipment !== equipment
      )
      this.setState({ equipmentNeeded: updatedEquipment })
    } else {
      this.setState({ equipmentNeeded: [...equipmentNeeded, equipment] })
    }
  }

  handlePreferredBeaches = ({ beach }) => {
    const { preferredBeaches } = this.state
    const isSelected = preferredBeaches.includes(beach)
    if (isSelected) {
      const updatedBeaches = preferredBeaches.filter(
        existingBeaches => existingBeaches !== beach
      )
      this.setState({ preferredBeaches: updatedBeaches })
    } else {
      this.setState({ preferredBeaches: [...preferredBeaches, beach] })
    }
  }

  initializeImageSelect = async () => {
    const cameraAccessStatus = await getCameraPermisions()
    const cameraRollAccessStatus = await getCameraRollPermisions()
    const canAccessCameraRoll = cameraRollAccessStatus === 'granted'
    const canAccessCamera = cameraAccessStatus === 'granted'
    await openImageSelector({ callback: this.setAndSaveProfileImage })
  }
  handleUserUpdate = async () => {
    const {
      firstName,
      lastName,
      hourlyRate,
      yearsOfExperience,
      equipmentOffered,
      cprCertified,
      preferredBeaches,
      about,
      equipmentNeeded
    } = this.state
    const {
      user,
      user: { id: userId },
      setUser
    } = this.props
    const userData = {
      firstName,
      lastName,
      hourlyRate,
      yearsOfExperience,
      equipmentOffered,
      cprCertified,
      preferredBeaches,
      about,
      equipmentNeeded
    }
    try {
      const {
        data: { profile: updatedProfile }
      } = await updateProfile({
        userId,
        profile: {
          ...userData
        }
      })
      setUser({
        user: {
          ...user,
          profile: updatedProfile
        }
      })
      Toast.show({
        text: 'Profile Updated!',
        buttonText: 'Okay'
      })
    } catch (err) {
      console.log('Error updating profile:', err)
    }
  }
  render () {
    const {
      email,
      firstName,
      lastName,
      profilePicture,
      hourlyRate,
      yearsOfExperience,
      equipmentOffered,
      cprCertified,
      preferredBeaches,
      about,
      equipmentNeeded
    } = this.state
    const { user } = this.props
    const isSurfer = user.accountType === 'surfer'
    const profileImageSource = profilePicture
      ? { uri: profilePicture }
      : require('../assets/default-avatar.png')
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Profile</Title>
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
                source={profileImageSource}
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
              <Item stackedLabel style={{ width: 300, marginRight: 10 }}>
                <Label>Hourly Rate</Label>

                <Input
                  onChangeText={hourlyRate => this.setState({ hourlyRate })}
                  value={hourlyRate}
                  placeholder='100'
                  autoCapitalize='none'
                  placeholderText
                  style={{ textAlign: 'center' }}
                />
              </Item>
              {isSurfer && (
                <Item stackedLabel style={{ width: 300, marginRight: 10 }}>
                  <Label>Years of Experience</Label>
                  <Input
                    onChangeText={yearsOfExperience =>
                      this.setState({ yearsOfExperience })
                    }
                    value={yearsOfExperience ? `${yearsOfExperience}`: null}
                    placeholder='4'
                    autoCapitalize='none'
                    placeholderText
                    style={{ textAlign: 'center' }}
                  />
                </Item>
              )}
              <Item
                stackedLabel
                style={{ width: 300, marginRight: 10, borderBottomWidth: 0 }}
              >
                <Label>About</Label>
                <Textarea
                  style={{ width: 300 }}
                  rowSpan={5}
                  bordered
                  placeholder='Write something about you...'
                  value={about}
                  onChangeText={about => this.setState({ about })}
                />
              </Item>
              {isSurfer ? (
                <Item
                  stackedLabel
                  style={{ width: 300, marginRight: 10, borderBottomWidth: 0 }}
                >
                  <Label>Equipment Offerred</Label>
                  {EQUIPMENT.map(equipment => (
                    <ListItem
                      key={equipment.name}
                      style={{ borderBottomWidth: 0 }}
                    >
                      <CheckBox
                        onPress={() =>
                          this.handleEquipmentOfferedSelect({
                            equipment: equipment.name
                          })
                        }
                        checked={equipmentOffered.includes(equipment.name)}
                      />
                      <Text>{equipment.label}</Text>
                    </ListItem>
                  ))}
                </Item>
              ) : (
                <Item
                  stackedLabel
                  style={{ width: 300, marginRight: 10, borderBottomWidth: 0 }}
                >
                  <Label>Equipment Needed</Label>
                  {EQUIPMENT.map(equipment => (
                    <ListItem
                      key={equipment.name}
                      style={{ borderBottomWidth: 0 }}
                    >
                      <CheckBox
                        onPress={() =>
                          this.handleEquipmentNeededSelect({
                            equipment: equipment.name
                          })
                        }
                        checked={equipmentNeeded.includes(equipment.name)}
                      />
                      <Text>{equipment.label}</Text>
                    </ListItem>
                  ))}
                </Item>
              )}
              <Item
                stackedLabel
                style={{ width: 300, marginRight: 10, borderBottomWidth: 0 }}
              >
                <Label>Preferred Beaches</Label>
                {BEACHES.map(beach => (
                  <ListItem key={beach.name} style={{ borderBottomWidth: 0 }}>
                    <CheckBox
                      onPress={() =>
                        this.handlePreferredBeaches({
                          beach: beach.name
                        })
                      }
                      checked={preferredBeaches.includes(beach.name)}
                    />
                    <Text>{beach.label}</Text>
                  </ListItem>
                ))}
              </Item>
              <Item
                stackedLabel
                style={{ width: 300, marginRight: 10, borderBottomWidth: 0 }}
              >
                <Label>CPR Certified</Label>
                <ListItem style={{ borderBottomWidth: 0 }}>
                  <CheckBox
                    onPress={() =>
                      this.setState({ cprCertified: !cprCertified })
                    }
                    checked={cprCertified}
                  />
                  <Text>I am CPR certified</Text>
                </ListItem>
              </Item>
            </Form>
            <Row
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                // height: 200
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
      setUser,
      clearUserData
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
