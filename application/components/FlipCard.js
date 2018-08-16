import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, TouchableOpacity, Dimensions } from 'react-native'
import { black, lightRed } from '../common/colors';

export default class FlipCard extends Component {
    state = {
        animatedValue: new Animated.Value(0)
    }

    componentWillMount() {
        this.value = 0;
        this.state.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.state.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.state.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.state.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.state.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    componentWillReceiveProps(newProps) {
        if (this.props.showAnswer !== newProps.showAnswer) {
            this.flipCard()
        }
    }

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.state.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.state.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

    render() {
        const { question, showAnswer, onShowAnswer } = this.props

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ],
            opacity: this.frontOpacity
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ],
            opacity: this.backOpacity
        }

        return (
            <View style={styles.container}>
                <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <Text style={styles.flipText}>
                            {question.question}
                        </Text>
                    </Animated.View>
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.flipText}>
                            {question.answer}
                        </Text>
                    </Animated.View>
                </View>
                <TouchableOpacity onPress={() => onShowAnswer()}>
                    <Text style={styles.flipTrigger}>{showAnswer ? 'question' : 'answer'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const width = Dimensions.get('window').width * 0.8
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipCard: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden'
    },
    flipCardBack: {
        position: 'absolute',
        top: 0,
    },
    flipText: {
        fontSize: 22,
        color: black,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    flipTrigger: {
        color: lightRed,
        fontSize: 16,
        textAlign: 'center'
    }
})
