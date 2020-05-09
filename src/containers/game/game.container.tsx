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
    const [dealWinningPlayer, setDealWinningPlayer] = useState(-1)

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
        <div className="d-flex flex-column">

            {
                _.map(distributedCardsData, (cardsData, index: any) => {
                    return <Accordion defaultActiveKey={index} key={index}>
                        <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                            Player {index}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Cards cardsData={cardsData} dealCard={dealCard} />
                        </Accordion.Collapse>
                    </Accordion>

                })
            }
            <Accordion defaultActiveKey={distributedCardsData.length + ''} key={distributedCardsData.length}>
                <Accordion.Toggle as={Button} variant="link" eventKey={distributedCardsData.length + ''}>Dealt Cards</Accordion.Toggle>
                <Accordion.Collapse eventKey={distributedCardsData.length + ''}>
                    <>
                        <Cards cardsData={dealtCards} />
                        <Alert variant="success">
                            {dealWinningCard.name} --- Player {dealWinningPlayer}
                        </Alert>
                        <Button onClick={handleNextDealButtonClick}>Next deal</Button>
                    </>
                </Accordion.Collapse>
            </Accordion>
        </div>

        {/* <Cards cardsData={currentCardsData} /> */}

    </>
}

export default Game;