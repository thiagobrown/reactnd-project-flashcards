import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { grey } from '../common/colors'
import { Ionicons } from '@expo/vector-icons'

const NotFound = ({ message = '', children }) => {
    return (
        <View style={styles.center}>
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-sad-outline' : 'md-sad'}
                size={100}
                style={{ color: grey }} />
            <Text style={{ color: grey }}>{message}</Text>
            {children}
        </View>
    )
}

NotFound.propTypes = {
    message: PropTypes.string,
    children: PropTypes.node
  }

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default NotFound