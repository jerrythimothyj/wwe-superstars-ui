import React from "react";
import TrumpCard from "../trump-card/trump-card.component"
import _ from "lodash";

const MainCards = (props: any) => {
    return <div>
        {_.map(props.cardsData, (cardData: any, index) => {
            return cardData && <TrumpCard
                cardData={cardData}
                key={cardData.id}
                index={index}
                dealCard={props.dealCard}
                currentPlayerNumber={props.currentPlayerNumber}
                playerNumber={props.playerNumber}
                totalNumberOfCards={props.cardsData.length}
                isDealCards={props.isDealCards}
                isNextMovePossible={props.isNextMovePossible}
            />
        })}
    </div>
}

export default MainCards;