import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap"
import "./trump-card.component.css"

const TrumpCard = (props: any) => {
    return <Card style={{ width: '20rem', margin: '1rem' }}>
        <img src={props.cardData.picture} className="cropped1" />
        <Card.Body>
            <Card.Header>{props.cardData.name}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item onClick={() => props.dealCard(props, 'height')}>Height: {props.cardData.height}</ListGroup.Item>
                <ListGroup.Item onClick={() => props.dealCard(props, 'weight')}>Weight: {props.cardData.weight}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card >

}

export default TrumpCard;