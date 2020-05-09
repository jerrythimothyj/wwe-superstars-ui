import React from "react";
import TrumpCard from "../trump-card/trump-card.component"
import _ from "lodash";

const Cards = (props: any) => {
    return <>
        {_.map(props.cardsData, (cardData: any, index) => {
            return <TrumpCard cardData={cardData} key={cardData.id} index={index} dealCard={props.dealCard} currentPlayerNumber={props.currentPlayerNumber} playerNumber={props.playerNumber} />
        })}
    </>
}

export default Cards;