import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { grey, white, black } from '../common/colors'

export default function DeckCard({ title, questions = [], style = {}, styleTitle = {}, styleSubTitle = {} }) {
    return (
        <View style={[styles.card, {...style}]}>
            <Text style={[styles.title, { ...styleTitle }]}>{title}</Text>
            <Text style={[styles.subtitle, { ...styleSubTitle }]}>{questions.length} cards</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 40,
        paddingBottom: 40,
        paddingRight: 0,
        alignItems: 'center',
        backgroundColor: white
    },
    title: {
        fontSize: 20,
        color: black
    },
    subtitle: {
        fontSize: 12,
        color: grey
    }
})
