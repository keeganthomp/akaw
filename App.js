import React from 'react'
import { Root } from 'native-base'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { composeWithDevTools } from 'redux-devtools-extension'

import AuthLoadingScreen from './screens/AuthLoading'
import LoginScreen from './screens/Login'
import SignupScreen from './screens/Signup'
import SignupVerifyScreen from './screens/SignupVerify'
import MainTabs from './navigation/BottomNav'
import { createSocketConsumers } from './socket'

const store = createStore(rootReducer, composeWithDevTools())

const AuthStack = createStackNavigator({
  Login: LoginScreen,
		Signup: SignupScreen,
		SignupVerify: SignupVerifyScreen
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
  constructor (props) {
    super()
    this.state = {
      notificationCount: null
    }
		}
		componentDidMount() {
			createSocketConsumers({ store })
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
