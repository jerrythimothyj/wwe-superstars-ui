import { actionTypes } from "./game.constants";

export const initialState = {
    currentCardsData: [],
    distributedCardsData: [],
    dealtCards: [],
    dealWinningCard: { name: '' },
    dealWinningPlayer: 0,
    dealtProperty: '',
    finalWinner: -1
}
export const gameReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CARDS_DATA:
            return {
                ...state,
                currentCardsData: action.payload
            }
        case actionTypes.SET_DISTRIBUTED_CARDS_DATA:
            return {
                ...state,
                distributedCardsData: action.payload
            }
        case actionTypes.SET_DEALT_CARDS_DATA:
            return {
                ...state,
                dealtCards: action.payload
            }
        case actionTypes.SET_DEAL_WINNING_CARD:
            return {
                ...state,
                dealWinningCard: action.payload
            }
        case actionTypes.SET_DEAL_WINNING_PLAYER:
            return {
                ...state,
                dealWinningPlayer: action.payload
            }
        case actionTypes.SET_DEALT_PROPERTY:
            return {
                ...state,
                dealtProperty: action.payload
            }
        case actionTypes.SET_FINAL_WINNER:
            return {
                ...state,
                finalWinner: action.payload
            }
        default:
            return state;
    }
} 