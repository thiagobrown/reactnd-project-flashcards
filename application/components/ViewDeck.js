import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { HeaderBackButton } from 'react-navigation'

import DeckCard from './DeckCard'
import Button from './Button'
import NotFound from './NotFound'
import { white, black } from '../common/colors'

class ViewDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck,
    headerLeft: <HeaderBackButton tintColor={white} onPress={() => navigation.navigate('Home')} />
  })

  onNavigateToAddCard = (title) => () => this.props.navigation.navigate('NewQuestion', { deck: title })

  onNavigateToQuiz = (title) => () => this.props.navigation.navigate('Quiz', { deck: title })

  render() {
    const { deck, navigation } = this.props

    if (!deck) {
      return <NotFound message='Not found deck' />
    }

    return (
      <View style={styles.container}>
        <DeckCard {...deck} styleTitle={{ fontSize: 32 }} styleSubTitle={{ fontSize: 20 }} />
        <Button textValue='Add Card' onPress={this.onNavigateToAddCard(deck.title)} />
        {
          deck.questions
          && deck.questions.length > 0
          && <Button
                textValue='Start Quiz'
                onPress={this.onNavigateToQuiz(deck.title)}
                styleButton={{ backgroundColor: black }}
                styleTextButton={{ color: white }} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: white,
    alignItems: 'center',
    paddingBottom: 20
  }
})

const mapStateToProps = ({ decks }, { navigation }) => ({
  deck: decks[navigation.state.params.deck] || {}
})

export default connect(mapStateToProps)(ViewDeck)
