import React from "react";
import TrumpCard from "../trump-card/trump-card.component"
import _ from "lodash";

const Cards = (props: any) => {
    console.log('props.playerNumber=', props.playerNumber)
    return <div className="d-flex justify-content-center">
        {_.map(props.cardsData, (cardData: any, index) => {
            return cardData && <TrumpCard
                cardData={cardData}
                key={cardData.id}
                index={index}
                dealCard={props.dealCard}
                currentPlayerNumber={props.currentPlayerNumber}
                playerNumber={props.playerNumber !== undefined && props.playerNumber || index}
                totalNumberOfCards={props.cardsData.length}
                isDealCards={props.isDealCards}
            />
        })}
    </div>
}

export default Cards;