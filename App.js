import React from 'react'
import { Root } from 'native-base'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { composeWithDevTools } from 'redux-devtools-extension'

import AuthLoadingScreen from './screens/AuthLoading'
import SigninScreen from './screens/Signin'
import SignupVerifyScreen from './screens/Signup/SignupVerify'
import MainTabs from './navigation/BottomNav'

const store = createStore(rootReducer, composeWithDevTools())

const AuthStack = createStackNavigator(
  {
    Signin: SigninScreen,
    SignupVerify: SignupVerifyScreen
  },
  {
    initialRouteName: 'Signin',
    headerMode: 'none'
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
  constructor (props) {
    super()
    this.state = {
      notificationCount: null
    }
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
