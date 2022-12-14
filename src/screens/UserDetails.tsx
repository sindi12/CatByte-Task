import React, { FC, useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { selectUsers } from '../data/slices/users'
import { UserDetailsProp } from '../navigation/AppStack'

import { colors, images } from '../themes'
import { useAppSelector } from '../utils/hooks/reduxHooks'
import { UserData } from '../types'

const initialState = {
  firstName: '',
  lastName: '',
  company: {
    address: '',
    postalCode: '',
    state: ''
  },
  age: 0,
  image: ''
}

export const UserDetails: FC<UserDetailsProp> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const [user, setUserData] = useState<UserData>(initialState)
  const users = useAppSelector(selectUsers)

  useEffect(() => {
    const userDetails = users.find(post => post.id === id) || initialState
    setUserData(userDetails)
  }, [])

  const goBack = () => navigation.goBack()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={goBack}>
          <Image source={images.back} style={styles.backImage} />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
    })
  }, [navigation])

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: user.image }}
        style={styles.image}
      />
      <Text style={styles.sectionTitle}>Full name</Text>
      <Text style={styles.paragraph}>{user?.firstName} {user?.lastName}</Text>
      <Text style={styles.sectionTitle}>Age</Text>
      <Text style={styles.paragraph}>{user?.age}</Text>
      <Text style={styles.sectionTitle}>Company details</Text>
      <Text style={styles.paragraph}>Address: {user?.company.address}</Text>
      <Text style={styles.paragraph}>Postal code: {user?.company.postalCode}</Text>
      <Text style={styles.paragraph}>State: {user?.company.state}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  backImage: {
    width: 18,
    height: 18,
    tintColor: colors.accent,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.accent,
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 24,
    fontStyle: 'italic',
  },
  image: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 110,
    overflow: 'hidden',
    marginBottom: 24
  }
})
