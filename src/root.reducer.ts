import { gameReducer } from './containers/game/game.reducers'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    gameReducer
})
