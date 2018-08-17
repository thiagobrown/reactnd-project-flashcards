import { AsyncStorage } from 'react-native'

export const DECKS_DATA = 'ReactndProjectFlashCards:decksData'

export const getAllDecks = async () =>
    // await AsyncStorage.removeItem(DECKS_DATA)
    await AsyncStorage.getItem(DECKS_DATA).then(result => {
        if (result) {
            return JSON.parse(result)
        }
        return {}
    })

export const getDeckByTitle = async (title) =>
    await AsyncStorage.getItem(DECKS_DATA).then(result => ({
        ...JSON.parse(result)[title]
    }))

export const insertDeck = async (title) =>
    await AsyncStorage.mergeItem(DECKS_DATA, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))

export const insertQuestionToDeck = async (title, question) =>
    await AsyncStorage.getItem(DECKS_DATA).then((result) => {
        const deck = JSON.parse(result)
        deck[title].questions.push(question)
        AsyncStorage.setItem(DECKS_DATA, JSON.stringify(deck))
    })
