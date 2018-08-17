import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'

import { lightBlueGrey, white } from './common/colors'

import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import ViewDeck from './components/ViewDeck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'

const RouteConfigs = {
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: () => <Entypo name='documents' size={30} color={lightBlueGrey} />
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: () => <Entypo name='squared-plus' size={30} color={lightBlueGrey} />
        }
    }
}

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? lightBlueGrey : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : lightBlueGrey,
            // shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    },
    lazy: false
}

const Tabs =
    Platform.OS == 'ios'
        ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
        : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)

const RootNavigation = createStackNavigator(
    {
        Home: {
            screen: Tabs,
        },
        ViewDeck: {
            screen: ViewDeck
        },
        NewQuestion: {
            screen: NewQuestion,
        },
        Quiz: {
            screen: Quiz
        }
    }, {
        initialRouteName: 'Home',
        navigationOptions: {
            title: 'FlashCards',
            headerForceInset: { top: 'never', bottom: 'never' },
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightBlueGrey,
            }
        }
    })

export default RootNavigation