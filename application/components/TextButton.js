import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { blueGrey } from '../common/colors'

const TextButton = ({ children, style = {}, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

TextButton.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: blueGrey,
    }
})

export default TextButton