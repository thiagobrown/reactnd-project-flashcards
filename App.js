import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'

import store from './application/store'
import RootNavigation from './application/RootNavigation'
import RootStatusBar from './application/components/RootStatusBar'
import { blueGrey } from './application/common/colors'
import { setLocalNotification } from './application/common/notification'

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <RootStatusBar backgroundColor={blueGrey} barStyle="light-content" />
          <RootNavigation />
        </View>
      </Provider>
    )
  }
}
