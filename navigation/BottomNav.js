import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { View, Text } from 'react-native'
import { Icon, Badge } from 'native-base'
import SurferList from '../screens/SurferList'
import SurferDetail from '../screens/SurferDetail'
import Chat from '../screens/Chat'
import HomeScreen from '../screens/Homescreen'
import ChatList from '../screens/ChatList'
import Profile from '../screens/Profile'
import NotificationIcon from './NotificationIcon'

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
    ChatListScreen: {
      screen: ChatList,
      navigationOptions: ({ screenProps }) => {
        return {
          title: 'chat-list',
          tabBarIcon: ({ tintColor, focused }) => (
            <NotificationIcon
              size={NAV_ICON_SIZE}
              name='contacts'
              tintColor={tintColor}
            />
          )
        }
      }
    },
    Profile: {
      screen: Profile,
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
