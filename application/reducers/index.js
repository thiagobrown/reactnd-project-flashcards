import { FETCH_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

function decksReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: [...state[action.title].questions, action.question]
                }
            }
        default:
            return state
    }
}

export default decksReducer