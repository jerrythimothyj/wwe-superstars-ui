import { actionTypes } from "./game.constants";

export const setCurrentCardsData = (payload: any) => ({
    type: actionTypes.SET_CURRENT_CARDS_DATA,
    payload
})

export const setDistributedCardsData = (payload: any) => ({
    type: actionTypes.SET_DISTRIBUTED_CARDS_DATA,
    payload
})

export const setDealtCardsData = (payload: any) => ({
    type: actionTypes.SET_DEALT_CARDS_DATA,
    payload
})

export const setDealWinningCard = (payload: any) => ({
    type: actionTypes.SET_DEAL_WINNING_CARD,
    payload
})

export const setDealWinningPlayer = (payload: any) => ({
    type: actionTypes.SET_DEAL_WINNING_PLAYER,
    payload
})

export const setDealtProperty = (payload: any) => ({
    type: actionTypes.SET_DEALT_PROPERTY,
    payload
})

export const setFinalWinner = (payload: any) => ({
    type: actionTypes.SET_FINAL_WINNER,
    payload
})