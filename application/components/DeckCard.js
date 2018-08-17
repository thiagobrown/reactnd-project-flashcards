import React from 'react'
import { StyleSheet, View } from 'react-native'
import { white } from '../common/colors'

export default function DeckCard({ children, style = {} }) {
    return (
        <View style={[styles.card, { ...style }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 0,
        alignItems: 'center',
        backgroundColor: white
    }
})
