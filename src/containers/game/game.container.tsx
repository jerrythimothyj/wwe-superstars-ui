import React, { useEffect } from "react";
import Cards from "../../components/cards/cards.component";
import { Button, Alert } from "react-bootstrap";
import _ from "lodash";
import { processDealtCards, drawDealtCards, findDealWinner, cardsData, shuffleCards, distributeCards, findFinalWinner } from "../../services/cards/cards.services"
import "./game.container.css"
import MainCards from "../../components/main-cards/main-cards.component";

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentCardsData, setDistributedCardsData, setDealtCardsData, setDealWinningCard, setDealWinningPlayer, setDealtProperty, setFinalWinner } from './game.actions'

const Game = () => {

    const currentCardsData = useSelector((state: any) => state.gameReducer.currentCardsData)
    const distributedCardsData = useSelector((state: any) => state.gameReducer.distributedCardsData)
    const dealtCards = useSelector((state: any) => state.gameReducer.dealtCards)
    const dealWinningCard = useSelector((state: any) => state.gameReducer.dealWinningCard)
    const dealWinningPlayer = useSelector((state: any) => state.gameReducer.dealWinningPlayer)
    const dealtProperty = useSelector((state: any) => state.gameReducer.dealtProperty)
    const finalWinner = useSelector((state: any) => state.gameReducer.finalWinner)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentCardsData(cardsData));
    }, [setCurrentCardsData]);

    const handleShuffleButtonClick = () => {
        dispatch(setCurrentCardsData(shuffleCards(currentCardsData)))
    }

    const handleDistributeButtonClick = () => {
        dispatch(setDistributedCardsData(distributeCards(currentCardsData)))
        dispatch(setDealtCardsData([]))
        dispatch(setDealWinningCard({ name: '' }))
        dispatch(setDealWinningPlayer(0))
    }

    const handleNextDealButtonClick = () => {
        const currentDistributedCardsData = processDealtCards(distributedCardsData, dealtCards, dealWinningPlayer)
        const winnerPlayerNumber = findFinalWinner(currentDistributedCardsData)
        dispatch(setFinalWinner(winnerPlayerNumber))
        dispatch(setDistributedCardsData(currentDistributedCardsData))
        dispatch(setDealtCardsData([]))
        dispatch(setDealWinningCard({ name: '' }))

    }

    const dealCard = (props: any, property: string) => {
        dispatch(setDealtProperty(property))
        const { dealtCards, remainingCards } = drawDealtCards(distributedCardsData)
        const { dealWinningCard, dealWinningPlayer } = findDealWinner(dealtCards, props, property)
        dispatch(setDealtCardsData(dealtCards))
        dispatch(setDistributedCardsData(remainingCards))
        dispatch(setDealWinningCard(dealWinningCard))
        dispatch(setDealWinningPlayer(dealWinningPlayer))
    }

    return <>
        <div> <Button onClick={handleShuffleButtonClick} className="m-3">Shuffle</Button>
            <Button onClick={handleDistributeButtonClick} className="m-3">Distribute</Button>
        </div>
        {distributedCardsData.length > 0 && <Alert variant="primary">
            Player {dealWinningPlayer}'s turn
        </Alert>}
        {finalWinner > -1 && <Alert variant="success">
            Winner of the match --- Player {finalWinner}
        </Alert>}

        <div className="d-flex flex-row justify-content-between flex-grow-1 w-100 flex-wrap">

            {
                _.map(distributedCardsData, (cardsData: any, index: any) => {
                    return <div>
                        <div className="text-white">Player number: {index}</div>
                        <div className="text-white">Cards remaining: {cardsData.length}</div>
                        <MainCards
                            key={index}
                            cardsData={cardsData}
                            currentPlayerNumber={dealWinningPlayer}
                            playerNumber={index}
                            dealCard={dealCard}
                            isNextMovePossible={dealtCards.length === 0}
                        />
                    </div>

                })
            }

        </div>
        {
            dealtCards.length > 0 && <div className="dealt-cards">

                {dealWinningPlayer > -1 && <Alert variant="success">
                    Deal Winner --- {dealWinningCard.name} --- Player {dealWinningPlayer}
                </Alert>}

                {dealtCards.length > 0 && <Cards cardsData={dealtCards} currentPlayerNumber={dealWinningPlayer} isDealCards={true} />}

                {dealWinningPlayer > -1 && <Button onClick={handleNextDealButtonClick}>Next deal</Button>}

            </div>
        }

        {/* <Cards cardsData={currentCardsData} /> */}

    </>
}

export default Game;