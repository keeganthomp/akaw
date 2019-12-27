import React from 'react'
import { Icon } from 'native-base'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import AuthLoadingScreen from './components/AuthLoading'
import LoginScreen from './authentication/Login'
import SignupScreen from './authentication/Signup'
import HomeScreen from './components/Homescreen'
import SurferList from './components/SurferList'
import SurferDetail from './components/SurferDetail'
import Account from './components/Account'

const store = createStore(rootReducer)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
})

const SurferStack = createStackNavigator({
  SurferList: SurferList,
  SurferDetail: SurferDetail
})

const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={50} name='ios-home' style={{ color: tintColor }} />
        )
      }
    },
    SurferScreen: {
      screen: SurferStack,
      navigationOptions: {
        title: 'surfer-list',
        // tabBarColor: Colors.bottomHomeColor,
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={50} name='contacts' style={{ color: tintColor }} />
        )
      }
    },
    Account: {
      screen: Account,
      navigationOptions: {
        title: 'my-account',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon size={50} name='person' style={{ color: tintColor }} />
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
        backgroundColor: '#51F6BB',
      }
    }
  }
)

const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainTabs,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
