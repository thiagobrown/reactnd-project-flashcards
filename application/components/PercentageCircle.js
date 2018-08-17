import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { white, lightGrey } from '../common/colors'

const PercentageCircle = ({ children, percentage = 0, backgroundColor, radius = 100 }) => {
    return (
        <View style={[styles.circle, { width: radius * 2, height: radius * 2, borderRadius: radius }]}>
            <View style={[styles.leftWrap, { left: 0, width: radius, height: radius * 2 }]}>
                <View
                    style={[styles.halfCircle, {
                        left: radius,
                        width: radius,
                        height: radius * 2,
                        backgroundColor: backgroundColor,
                        borderRadius: radius,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        transform: [
                            { translateX: -radius / 2 },
                            { rotate: `${percentage >= 50 ? (percentage - 50) * 3.6 : 0}deg` },
                            { translateX: radius / 2 },
                        ]
                    }]}
                />
            </View>
            <View style={[styles.leftWrap, { left: radius, width: radius, height: radius * 2 }]}>
                <View
                    style={[styles.halfCircle, {
                        left: -radius,
                        width: radius,
                        height: radius * 2,
                        backgroundColor: backgroundColor,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        transform: [
                            { translateX: radius / 2 },
                            { rotate: `${percentage >= 50 ? 180 : percentage * 3.6}deg` },
                            { translateX: -radius / 2 },
                        ]
                    }]}
                />
            </View>
            <View
                style={[styles.innerCircle, {
                    width: (radius * 0.9) * 2,
                    height: (radius * 0.9) * 2,
                    borderRadius: (radius * 0.9)
                }]}>
                {children}
            </View>
        </View>
    )
}

PercentageCircle.propTypes = {
   children: PropTypes.node,
   percentage: PropTypes.number,
   backgroundColor: PropTypes.string.isRequired,
   radius: PropTypes.number
  }

const styles = StyleSheet.create({
    circle: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightGrey
    },
    leftWrap: {
        overflow: 'hidden',
        position: 'absolute',
        top: 0
    },
    halfCircle: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    innerCircle: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white
    }
})

export default PercentageCircle