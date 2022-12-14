import React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { colors } from '../themes'

interface Button {
  disabled?: boolean
  textStyle?: TextStyle
  title: string
  wrapperStyle?: ViewStyle
  onPress(): void
}

const Button = ({ disabled, onPress, textStyle, title, wrapperStyle }: Button) => {
  const buttonStyle = [styles.button, wrapperStyle, disabled && styles.disabled]
  const labelStyle = [styles.text, textStyle]

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={buttonStyle} activeOpacity={0.7}>
      <Text style={labelStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 7,
    fontSize: 18,
    height: 50,
    backgroundColor: colors.accent,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
})

export default Button
