import React, { FC } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'

import { colors } from '../themes'
import Button from '../components/Button'
import { useAppDispatch } from '../utils/hooks/reduxHooks'

import { HomeScreenNavigationProp, PostUserData } from '../types'
import { actions } from '../data/slices/users'

export const NewUser: FC = () => {
  const dispatch = useAppDispatch()
  const { goBack } = useNavigation<HomeScreenNavigationProp>()

  const createNewUser = (data: PostUserData) => {
    dispatch(actions.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      company: {
        address: data.address,
        postalCode: data.postalCode,
        state: data.state
      },
      age: data.age,
      image: data.image
    }))
    goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Formik initialValues={{
          firstName: '',
          lastName: '',
          address: '',
          postalCode: '',
          state: '',
          age: '',
          image: ''
        }} onSubmit={createNewUser}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.formWrapper}>
              <View>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  placeholder="Your first name goes here..."
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  style={styles.input}
                />
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  placeholder="Your last name goes here..."
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  style={styles.input}
                />
                <Text style={styles.inputLabel}>Age</Text>
                <TextInput
                  placeholder="Your age goes here..."
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                  style={styles.input}
                />
                <Text style={styles.inputLabel}>Profile pic</Text>
                <TextInput
                  placeholder="The link to your profile picture..."
                  onChangeText={handleChange('image')}
                  onBlur={handleBlur('image')}
                  value={values.image}
                  style={styles.input}
                />
                <Text style={styles.inputLabel}>Company address</Text>
                <TextInput
                  placeholder="Write your address..."
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  style={styles.input}
                />
                <Text style={styles.inputLabel}>Company postal code</Text>
                <TextInput
                  placeholder="Your postal code goes here..."
                  onChangeText={handleChange('postalCode')}
                  onBlur={handleBlur('postalCode')}
                  value={values.postalCode}
                  style={styles.input}
                />
                <Text style={styles.inputLabel}>Company state</Text>
                <TextInput
                  placeholder="The state in which you are operating..."
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  value={values.state}
                  style={styles.input}
                />
              </View>
              <Button
                title="Create new user"
                disabled={!values.firstName || !values.lastName || !values.age || !values.image || !values.address || !values.postalCode || !values.state}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  input: {
    fontSize: 14,
    marginBottom: 18,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 6,
    padding: 10,
  },
  descriptionInput: {
    height: 150,
  },
  formWrapper: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 12,
    lineHeight: 12,
    marginBottom: 8,
  },
})
