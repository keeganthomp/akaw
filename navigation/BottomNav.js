import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { Icon } from 'native-base'
import SurferList from '../screens/Surfer/SurferList'
import SurferDetail from '../screens/Surfer/SurferDetail'
import Chat from '../screens/Chat'
import HomeScreen from '../screens/Home'
import ChatList from '../screens/Chat/ChatList'
import Profile from '../screens/Profile'
import NotificationIcon from './NotificationIcon'
import { primaryColor } from '../constants/colors'
import { EvilIcons, AntDesign, Feather } from '@expo/vector-icons'
import ChatHeader from '../screens/Chat/ChatHeader'
const NAV_ICON_SIZE = 25

const SurferStack = createStackNavigator({
  SurferList,
  SurferDetail
})

const ChatStack = createStackNavigator(
  {
    Chat,
    ChatList
  },
  {
    initialRouteName: 'ChatList',
    headerMode: 'none',
  }
)

ChatStack.navigationOptions = ({ navigation }) => {
	const tabBarVisible = navigation.state.index < 1
	return {
			tabBarVisible
	}
}

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
          <AntDesign name='home' size={NAV_ICON_SIZE} color={tintColor} />
        )
      }
    },
    SurferScreen: {
      screen: SurferStack,
      navigationOptions: {
        title: 'surfer-list',
        tabBarIcon: ({ tintColor, focused }) => (
          <Feather size={NAV_ICON_SIZE} name='users' color={tintColor} />
        )
      }
    },
    ChatScreen: {
      screen: ChatStack,
      navigationOptions: () => {
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
          <Feather name='user' size={NAV_ICON_SIZE} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#333',
      inactiveTintColor: '#fff',
      keyboardHidesTabBar: false,
      style: {
        backgroundColor: primaryColor
      }
    }
  }
)

export default MainTabs
