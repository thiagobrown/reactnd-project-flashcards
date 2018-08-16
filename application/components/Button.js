import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { black, white } from '../common/colors'

export default function Button({ textValue = '', styleButton = {}, styleTextButton = {}, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { ...styleButton }]}
      onPress={onPress}>
      <Text style={[styles.text, { ...styleTextButton }]}>{textValue}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: white,
    padding: 10,
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 10,
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  text: {
    color: black,
    fontSize: 18,
    textAlign: 'center',
  }
})