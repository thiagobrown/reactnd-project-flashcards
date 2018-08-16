import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, StyleSheet, View } from 'react-native'

import { white, lightGreen, green, lightRed, red, blue, blueGrey } from '../common/colors'

import FlipCard from './FlipCard'
import Button from './Button'
import PercentageCircle from './PercentageCircle'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Quiz of ${navigation.state.params.deck}`
  })

  state = {
    currentIndex: 0,
    showAnswer: false,
    correctAnswers: 0
  }

  onShowAnswer = () => this.setState(({ showAnswer }) => ({ showAnswer: !showAnswer }))

  onCorrect = () => this.setState(({ currentIndex, correctAnswers }) => ({ currentIndex: currentIndex + 1, correctAnswers: correctAnswers + 1, showAnswer: false }))

  onIncorrect = () => this.setState(({ currentIndex }) => ({ currentIndex: currentIndex + 1, showAnswer: false }))

  onReset = () => this.setState({ currentIndex: 0, correctAnswers: 0, showAnswer: false })

  onNavigateToViewDeck = () => this.props.navigation.goBack()

  render() {
    const { deck } = this.props
    const { currentIndex, showAnswer, correctAnswers } = this.state

    if ((currentIndex + 1) > deck.questions.length) {

      return (
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <PercentageCircle backgroundColor={blue} percentage={Math.round((correctAnswers / deck.questions.length) * 100)}>
            <Text style={{ fontSize: 22 }}>{Math.round((correctAnswers / deck.questions.length) * 100)}%</Text>
          </PercentageCircle>
          <Text style={{ fontSize: 22, paddingTop: 20 }}>Finish</Text>
          <Text style={{ fontSize: 18, paddingTop: 20, paddingBottom: 20 }}>You scored {correctAnswers} out of {deck.questions.length} questions!</Text>
          <Button textValue='Restart Quiz' styleButton={{ backgroundColor: blue, borderColor: blueGrey }} styleTextButton={{ color: white }} onPress={this.onReset} />
          <Button textValue='Back to Deck' onPress={this.onNavigateToViewDeck} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, padding: 10 }}>{`${currentIndex + 1} / ${deck.questions.length}`}</Text>
        <FlipCard question={deck.questions[currentIndex]} showAnswer={showAnswer} onShowAnswer={this.onShowAnswer} />
        {showAnswer &&
          <Button
            textValue='Correct'
            onPress={this.onCorrect}
            styleButton={{ backgroundColor: lightGreen, borderColor: green }}
            styleTextButton={{ color: white }} />}
        {showAnswer &&
          <Button
            textValue='Incorrect'
            onPress={this.onIncorrect}
            styleButton={{ backgroundColor: lightRed, borderColor: red }}
            styleTextButton={{ color: white }} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingBottom: 40
  }
})

const mapStateToProps = ({ decks }, { navigation }) => ({
  deck: decks[navigation.state.params.deck] || {}
})

export default connect(mapStateToProps)(Quiz)