import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { Entypo } from '@expo/vector-icons'

import { fetchDecks } from '../actions'
import { getAllDecks } from '../common/api'
import { black, lightRed, white, grey } from '../common/colors'

import DeckCard from './DeckCard'
import TextButton from './TextButton'
import NotFound from './NotFound'

class Decks extends Component {
    static navigationOptions = () => ({
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.isFocused()) {
                return;
            }
            navigation.state.params.onTabFocus()
            defaultHandler()
        }
    })

    state = {
        isLoading: false
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onTabFocus: this.onDecks
        });

        this.onDecks()
    }

    onDecks = () => {
        const { loadDecks } = this.props

        this.setState({ isLoading: true })

        getAllDecks()
            .then((results) => loadDecks(results))
            .then(() => this.setState(() => ({ isLoading: false })))
            .catch((error) => this.setState(() => ({ isLoading: false })))
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ borderBottomWidth: 1, borderBottomColor: black }}
            onPress={() => this.props.navigation.navigate('ViewDeck', { deck: item.title })}>
            <DeckCard>
                <Text style={{ fontSize: 20, color: black }}>{item.title}</Text>
                <Text style={{ fontSize: 12, color: grey }}>{item.questions.length} cards</Text>
            </DeckCard>
        </TouchableOpacity>
    )

    onNavigateToNewDeck = () => this.props.navigation.navigate('NewDeck')

    render() {
        const { decks } = this.props
        const { isLoading } = this.state

        if (isLoading) {
            return <AppLoading />
        }

        if (Object.keys(decks).length == 0) {
            return (
                <NotFound message='Ops! No exists decks'>
                    {
                        Platform.OS === 'ios'
                            ? <TextButton style={{ padding: 10 }} onPress={this.onNavigateToNewDeck}>Add new deck</TextButton>
                            : <TouchableOpacity style={styles.floatingButton} onPress={this.onNavigateToNewDeck}>
                                <Entypo name="plus" size={30} color={white} />
                            </TouchableOpacity>
                    }
                </NotFound>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={Object.values(decks)}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                    onRefresh={this.onDecks}
                    refreshing={false}
                />
                {
                    Platform.OS === 'android' &&
                    <TouchableOpacity style={styles.floatingButton} onPress={this.onNavigateToNewDeck}>
                        <Entypo name="plus" size={30} color={white} />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    floatingButton: {
        position: 'absolute',
        width: 70,
        height: 70,
        backgroundColor: lightRed,
        borderRadius: 50,
        bottom: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    }
})

const mapStateToProps = ({ decks }) => ({ decks })

const mapDispatchToProps = (dispatch) => ({
    loadDecks: (decks) => dispatch(fetchDecks(decks))
})

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
