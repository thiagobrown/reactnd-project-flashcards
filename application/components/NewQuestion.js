import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'

import { insertQuestionToDeck } from '../api'
import { addQuestion } from '../actions'

import { white, grey, black } from '../common/colors'
import Button from './Button'

class NewQuestion extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Card'
  })

  state = {
    question: '',
    answer: ''
  }

  handleChangeQuestion = question => this.setState({ question })

  handleChangeAnswer = answer => this.setState({ answer })

  onSubmit = () => {
    const { question, answer } = this.state
    const { deck, saveQuestionToDeck } = this.props

    if (!question || question.trim().length === 0
      || !answer || answer.trim().length === 0) {
      return Alert.alert(
        'Ops!',
        'Question or Asnwer not valid!',
        [{ text: 'OK' }],
        { cancelable: false })
    }

    insertQuestionToDeck(deck.title, { question: question.trim(), answer: answer.trim() })
      .then(() => {
        saveQuestionToDeck(deck.title, { question: question.trim(), answer: answer.trim() })
      })
      .then((response) => {
        Alert.alert(
          '',
          'Question created successfully!',
          [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
          { cancelable: false })
        this.setState({ question: '', answer: '' })
      })
  }

  render() {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.title}>Question?</Text>
        <TextInput
          style={styles.inputText}
          value={question}
          onChangeText={this.handleChangeQuestion}
          placeholder='Enter the Question'
          placeholderTextColor={grey} />
        <Text style={styles.title}>Answer</Text>
        <TextInput
          style={styles.inputText}
          value={answer}
          onChangeText={this.handleChangeAnswer}
          placeholder='Enter the Asnwer'
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
    fontSize: 18,
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

const mapStateToProps = ({ decks }, { navigation }) => ({
  deck: decks[navigation.state.params.deck] || {}
})

const mapDispatchToProps = (dispatch) => ({
  saveQuestionToDeck: (title, question) => dispatch(addQuestion(title, question))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)
