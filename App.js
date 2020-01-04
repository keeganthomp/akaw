import React from 'react'
import { Root } from 'native-base'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AuthLoadingScreen from './components/AuthLoading'
import LoginScreen from './authentication/Login'
import SignupScreen from './authentication/Signup'
import MainTabs from './navigation/BottomNav'

const store = createStore(rootReducer)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
})

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
  state = {
    notificationCount: null
  }
  async componentDidMount () {
    const notifications = await AsyncStorage.getItem('notifications')
    const notificationCount = Number(notifications)
    this.setState({ notificationCount })
  }
  render () {
    const { notificationCount } = this.state
    return (
      <Provider store={store}>
        <Root>
          <Navigation screenProps={{ notifications: notificationCount }} />
        </Root>
      </Provider>
    )
  }
}
