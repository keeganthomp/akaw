import React from 'react'
import { View, Text } from 'react-native'
import { Icon, Badge } from 'native-base'
import { connect } from 'react-redux'

class NotificationIcon extends React.Component {
  render () {
				const { notifications, tintColor, size } = this.props
    const doesUserHaveNotifications = notifications && notifications.length > 0
    return doesUserHaveNotifications ? (
      <View>
        <Badge
          style={{
            position: 'absolute',
            zIndex: 9,
            right: -7,
            widht: 5,
            height: 20
          }}
        >
          <Text style={{ fontSize: 12, color: '#fff' }}>
            {notifications.length}
          </Text>
        </Badge>
        <Icon size={size} name='ios-chatbubbles' style={{ color: tintColor }} />
      </View>
    ) : (
      <Icon size={size} name='ios-chatbubbles' style={{ color: tintColor }} />
    )
  }
}

const mapStateToProps = state => {
  const { notifications } = state
  return { notifications }
}

export default connect(mapStateToProps)(NotificationIcon)
