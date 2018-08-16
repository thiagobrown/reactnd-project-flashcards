import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { grey } from '../common/colors'
import { Ionicons } from '@expo/vector-icons'

export default function NotFound({ message = '', children }) {
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

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})