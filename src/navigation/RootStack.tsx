import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import HomeStack from './AppStack'

export default function Navigation() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  )
}
