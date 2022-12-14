import React, { FC, useEffect } from 'react'
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { fetchUsers, selectUsers, actions } from '../data/slices/users'
import { HomeScreenNavigationProp, ItemType } from '../types'
import { useAppDispatch, useAppSelector } from '../utils/hooks/reduxHooks'
import UserItem from '../components/UserItem'
import Button from '../components/Button'

export const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { navigate } = useNavigation<HomeScreenNavigationProp>()

  const { right, bottom, left } = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  const availableWidth = width - 32
  const itemWidth = availableWidth / 2 - 8

  const users = useAppSelector(selectUsers)

  const navigateToUser = (id: number) => navigate('UserDetails', { id })
  const navigateToNewUser = () => navigate('NewUser')

  const listUsers = () => dispatch(fetchUsers())

  const removeUser = (id: number) => dispatch(actions.removeUser(id))

  useEffect(() => {
    listUsers()
  }, [])

  const keyExtractor = ({ id }: { id: number }) => id.toString()

  const renderItem = ({ item }: { item: ItemType }) => (
    <UserItem
      key={item.id}
      {...item}
      width={itemWidth}
      onPress={() => navigateToUser(item.id)}
      onRemove={() => removeUser(item.id)}
    />
  )

  return (
    <>
      <FlatList
        numColumns={2}
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
        columnWrapperStyle={{
          paddingLeft: 10 + left,
          paddingRight: 10 + right,
        }}
      />
      <Button
        title="Add user"
        onPress={navigateToNewUser}
        wrapperStyle={{
          marginBottom: bottom,
          marginHorizontal: 16,
          paddingVertical: 5
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  button: {
  }
})
