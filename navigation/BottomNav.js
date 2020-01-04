import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { View, Text } from 'react-native'
import { Icon, Badge } from 'native-base'
import SurferList from '../components/SurferList'
import SurferDetail from '../components/SurferDetail'
import Chat from '../components/Chat'
import HomeScreen from '../components/Homescreen'
import Notifications from '../components/Notifications'
import Account from '../components/Account'

const NAV_ICON_SIZE = 35

const SurferStack = createStackNavigator({
  SurferList,
  SurferDetail,
  Chat
})

SurferStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = navigation.state.index !== 2
  return {
    tabBarVisible
  }
}

const renderNotificationIcon = ({ count, name, tintColor }) => {
  if (count) {
    return (
      <View>
        <Badge style={{ position: 'absolute', zIndex: 9, right: -7, widht: 5, height: 20 }}>
          <Text style={{ fontSize: 12, color: '#fff' }}>{count}</Text>
        </Badge>
        <Icon size={NAV_ICON_SIZE} name={name} style={{ color: tintColor }} />
      </View>
    )
  } else {
    return (
      <Icon
        size={NAV_ICON_SIZE}
        type='ionicon'
        name={name}
        style={{ color: tintColor }}
      />
    )
  }
}

const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={NAV_ICON_SIZE} name='home' style={{ color: tintColor }} />
        )
      }
    },
    SurferScreen: {
      screen: SurferStack,
      navigationOptions: {
        title: 'surfer-list',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            size={NAV_ICON_SIZE}
            name='contacts'
            style={{ color: tintColor }}
          />
        )
      }
    },
    NotificationScreen: {
      screen: Notifications,
      navigationOptions: ({ screenProps }) => {
        const { notifications } = screenProps
        return {
          title: 'notifications',
          tabBarIcon: ({ tintColor, focused }) =>
            renderNotificationIcon({
              count: 4,
              name: 'ios-chatbubbles',
              tintColor
            })
        }
      }
    },
    Account: {
      screen: Account,
      navigationOptions: {
        title: 'my-account',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            size={NAV_ICON_SIZE}
            name='person'
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#333',
      inactiveTintColor: '#fff',
      style: {
        backgroundColor: '#51F6BB'
      }
    }
  }
)

export default MainTabs
