import React, { useState } from "react";
import Cards from "../../components/cards/cards.component";
import { cardsData, shuffleCards, distributeCards } from "../../services/cards/cards.services"
import { Button, Accordion, Alert } from "react-bootstrap";
import _ from "lodash";
import { processDealtCards, drawDealtCards, findDealWinner } from "../../services/cards/cards.services"
import "./game.container.css"

const Game = () => {
    const [currentCardsData, setCurrentCardsData] = useState(cardsData)
    const [distributedCardsData, setDistributedCardsData] = useState([])
    const [dealtCards, setDealtCardsData] = useState([])
    const [dealWinningCard, setDealWinningCard] = useState({ name: '' })
    const [dealWinningPlayer, setDealWinningPlayer] = useState(0)

    const handleShuffleButtonClick = () => {
        setCurrentCardsData(shuffleCards(currentCardsData))
    }

    const handleDistributeButtonClick = () => {
        setDistributedCardsData(distributeCards(currentCardsData))
    }

    const handleNextDealButtonClick = () => {
        const currentDistributedCardsData = processDealtCards(distributedCardsData, dealtCards, dealWinningPlayer)
        setDistributedCardsData(currentDistributedCardsData)
        setDealtCardsData([])
        setDealWinningCard({ name: '' })
        setDealWinningPlayer(-1)
    }

    const dealCard = (props: any, property: string) => {
        const { dealtCards, remainingCards } = drawDealtCards(props)
        const { dealWinningCard, dealWinningPlayer } = findDealWinner(dealtCards, props, property)
        setDealtCardsData(dealtCards)
        setDistributedCardsData(remainingCards)
        setDealWinningCard(dealWinningCard)
        setDealWinningPlayer(dealWinningPlayer)
    }

    return <>
        <div> <Button onClick={handleShuffleButtonClick}>Shuffle</Button>
            <Button onClick={handleDistributeButtonClick}>Distribute</Button>
        </div>
        <div className="d-flex flex-row justify-content-between flex-grow-1 w-100">

            {
                _.map(distributedCardsData, (cardsData, index: any) => {
                    return <Accordion defaultActiveKey={index} key={index}>
                        <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                            Player {index}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Cards cardsData={cardsData} dealCard={dealCard} currentPlayerNumber={dealWinningPlayer} playerNumber={index} />
                        </Accordion.Collapse>
                    </Accordion>

                })
            }

        </div>
        {distributedCardsData.length > 0 && <div className="dealt-cards">
            <Accordion defaultActiveKey={distributedCardsData.length + ''} key={distributedCardsData.length}>
                <Accordion.Toggle as={Button} variant="link" eventKey={distributedCardsData.length + ''}>Dealt Cards</Accordion.Toggle>
                {dealWinningPlayer > -1 && <Alert variant="success">
                    {dealWinningCard.name} --- Player {dealWinningPlayer}
                </Alert>}
                <Accordion.Collapse eventKey={distributedCardsData.length + ''}>
                    <>
                        <Cards cardsData={dealtCards} currentPlayer={-1} />

                        {dealWinningPlayer > -1 && <Button onClick={handleNextDealButtonClick}>Next deal</Button>}
                    </>
                </Accordion.Collapse>
            </Accordion>
        </div>}

        {/* <Cards cardsData={currentCardsData} /> */}

    </>
}

export default Game;