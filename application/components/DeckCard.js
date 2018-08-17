import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { white } from '../common/colors'

const DeckCard = ({ children, style = {} }) => {
    return (
        <View style={[styles.card, { ...style }]}>
            {children}
        </View>
    )
}

DeckCard.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
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

export default DeckCard
