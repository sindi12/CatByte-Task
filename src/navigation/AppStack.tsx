import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { colors } from '../themes'
import { Home, NewUser, UserDetails } from '../screens'

export type HomeStackParamList = {
  HomeScreen: undefined
  NewUser: undefined
  UserDetails: {
    id: number
  }
}

export type UserDetailsProp = NativeStackScreenProps<HomeStackParamList, 'UserDetails'>

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          title: 'All users',
          headerBackTitleVisible: false,
          headerTintColor: colors.accent,
          headerTitleStyle: { color: colors.black },
        }}
      />
      <Stack.Screen
        name="NewUser"
        component={NewUser}
        options={{
          title: 'New user',
          headerBackTitleVisible: false,
          headerTintColor: colors.accent,
          headerTitleStyle: { color: colors.black },
        }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          title: 'User details',
          headerBackTitleVisible: false,
          headerTintColor: colors.accent,
          headerTitleStyle: { color: colors.black },
        }}
      />
    </Stack.Navigator>
  )
}
