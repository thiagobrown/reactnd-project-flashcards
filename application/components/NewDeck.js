import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'

import { addDeck } from '../actions'
import { insertDeck } from '../common/api'
import { grey, black, white } from '../common/colors'
import Button from './Button';

class NewDeck extends Component {
  state = {
    title: ''
  }

  handleChange = title => this.setState({ title })

  onSubmit = () => {
    const { title } = this.state
    const { saveDeck } = this.props

    if (!title || title.trim().length === 0) {
      return Alert.alert(
        'Ops!',
        'Enter a title for the deck!',
        [{ text: 'OK' }],
        { cancelable: false })
    }

    insertDeck(title.trim())
      .then(() => {
        saveDeck({ [title.trim()]: { title: title.trim(), questions: [] } })
      })
      .then((response) => {
        Alert.alert(
          '',
          'Deck created successfully!',
          [{ text: 'OK', onPress: () => this.props.navigation.navigate('ViewDeck', { deck: title }) }],
          { cancelable: false })
        this.setState({ title: '' })
      })
  }

  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.inputText}
          value={title}
          onChangeText={this.handleChange}
          placeholder='Deck title'
          placeholderTextColor={grey} />
        <Button
          textValue='Submit'
          styleButton={{ backgroundColor: black }}
          styleTextButton={{ color: white }}
          onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20
  },
  inputText: {
    height: 40,
    borderWidth: 1,
    borderColor: black,
    padding: 10,
    borderRadius: 3,
    marginBottom: 20
  }
})

const mapDispatchToProps = (dispatch) => ({
  saveDeck: (deck) => dispatch(addDeck(deck))
})

export default connect(null, mapDispatchToProps)(NewDeck)