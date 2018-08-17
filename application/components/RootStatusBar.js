import React from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

const RootStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

RootStatusBar.propTypes = {
    backgroundColor: PropTypes.string.isRequired
}

export default RootStatusBar