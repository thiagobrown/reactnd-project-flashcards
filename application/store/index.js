import { createStore, combineReducers } from 'redux'
import decksReducer from '../reducers'

const reducers = combineReducers({
    decks: decksReducer
})

const store = createStore(reducers)

export default store