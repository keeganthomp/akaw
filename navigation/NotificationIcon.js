import React from 'react'
import { View, Text } from 'react-native'
import { Icon, Badge } from 'native-base'
import { connect } from 'react-redux'
import {  AntDesign } from '@expo/vector-icons'

class NotificationIcon extends React.Component {
  render () {
    const { notifications, tintColor, size } = this.props
    const unreadNotifications =
      notifications &&
      notifications.filter(notification => !notification.hasBeenSeen)
    return unreadNotifications && unreadNotifications.length > 0 ? (
      <View>
        <Badge
          style={{
            position: 'absolute',
            zIndex: 9,
            right: -7,
            height: 20
          }}
        >
          <Text style={{ fontSize: 12, color: '#fff' }}>
            {unreadNotifications.length}
          </Text>
        </Badge>
        <AntDesign
          name='message1'
          size={size}
          color={tintColor}
        />
      </View>
    ) : (
      <AntDesign
        name='message1'
        size={size}
        color={tintColor}
      />
    )
  }
}

const mapStateToProps = state => {
  const { notifications } = state
  return { notifications }
}

export default connect(mapStateToProps)(NotificationIcon)
