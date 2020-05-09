import React, { useState } from "react";
import Cards from "../../components/cards/cards.component";
import { Button, Alert } from "react-bootstrap";
import _ from "lodash";
import { processDealtCards, drawDealtCards, findDealWinner, cardsData, shuffleCards, distributeCards, findFinalWinner } from "../../services/cards/cards.services"
import "./game.container.css"
import MainCards from "../../components/main-cards/main-cards.component";

const Game = () => {
    const [currentCardsData, setCurrentCardsData] = useState(cardsData)
    const [distributedCardsData, setDistributedCardsData] = useState([])
    const [dealtCards, setDealtCardsData] = useState([])
    const [dealWinningCard, setDealWinningCard] = useState({ name: '' })
    const [dealWinningPlayer, setDealWinningPlayer] = useState(0)
    const [dealtProperty, setDealtProperty] = useState('')
    const [finalWinner, setFinalWinner] = useState(-1)

    const handleShuffleButtonClick = () => {
        setCurrentCardsData(shuffleCards(currentCardsData))
    }

    const handleDistributeButtonClick = () => {
        setDistributedCardsData(distributeCards(currentCardsData))
        setDealtCardsData([])
        setDealWinningCard({ name: '' })
        setDealWinningPlayer(0)
    }

    const handleNextDealButtonClick = () => {
        const currentDistributedCardsData = processDealtCards(distributedCardsData, dealtCards, dealWinningPlayer)
        const winnerPlayerNumber = findFinalWinner(currentDistributedCardsData)
        setFinalWinner(winnerPlayerNumber)
        setDistributedCardsData(currentDistributedCardsData)
        setDealtCardsData([])
        setDealWinningCard({ name: '' })

    }

    const dealCard = (props: any, property: string) => {
        setDealtProperty(property)
        const { dealtCards, remainingCards } = drawDealtCards(distributedCardsData)
        const { dealWinningCard, dealWinningPlayer } = findDealWinner(dealtCards, props, property)
        setDealtCardsData(dealtCards)
        setDistributedCardsData(remainingCards)
        setDealWinningCard(dealWinningCard)
        setDealWinningPlayer(dealWinningPlayer)

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