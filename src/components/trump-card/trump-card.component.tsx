import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap"
import "./trump-card.component.css"

const TrumpCard = (props: any) => {
    const isDealCardPossible = props.isNextMovePossible && props.playerNumber === props.currentPlayerNumber
    return <Card
        className="trump-card"
        style={{ borderColor: props.isDealCards && props.playerNumber === props.currentPlayerNumber && 'green' || 'white' }}>
        <img
            src={(props.index === props.totalNumberOfCards - 1 || props.isDealCards) && props.cardData.picture}
            className="cropped1"
        />
        <Card.Body>
            <Card.Header>{props.cardData.name}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item
                    onClick={() => isDealCardPossible && props.dealCard(props, 'height')}
                    style={{ cursor: isDealCardPossible && 'pointer' || 'not-allowed' }}>
                    Height: {props.cardData.height}
                </ListGroup.Item>
                <ListGroup.Item onClick={() => isDealCardPossible && props.dealCard(props, 'weight')}
                    style={{ cursor: isDealCardPossible && 'pointer' || 'not-allowed' }}>
                    Weight: {props.cardData.weight}
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card >

}

export default TrumpCard;