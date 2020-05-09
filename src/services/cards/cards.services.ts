import { deepCopy } from "../objects/objects.services"
import _ from "lodash"

export const cardsData = [{ "id": "5d312c1e-8bbe-11ea-bc55-0242ac130003", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/rd-talent/Stat/Dwayne_The_Rock_Johnson_stat.png", "name": "The Rock", "weight": "260lbs", "height": "6'5\"" }, { "id": "7e42e716-8bbf-11ea-bc55-0242ac130003", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/all/2017/03/big_show_stat--da2e066cf1ca9da559fb016f143a3200.png", "name": "Big Show", "weight": "383lbs", "height": "7'0\"" }, { "id": "257395cc-8bbf-11ea-bc55-0242ac130003", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/rd-talent/Stat/Stone_Cold_Steve_Austin_stat.png", "name": "Stone Cold Steve Austin", "weight": "252lbs", "height": "6'2\"" }, { "id": "2df53a9a-8bd6-11ea-bc55-0242ac130003", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/all/2016/12/Goldberg_stat--f4592957959710720424cb3c6c630780.png", "name": "Goldberg", "weight": "285lbs", "height": "6'4\"" }, { "id": "95858720-8d69-11ea-b8f3-7951977b5ff2", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/all/2017/01/John_Cena_stat--53eefb07344f336ed7edf78a0474c6b6.png", "name": "John Cena", "weight": "251lbs", "height": "6'1\"" }, { "id": "78181918-8bbc-11ea-bc55-0242ac130003", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/rd-talent/Stat/undertaker_stat.png", "name": "Undertaker", "weight": "309lbs", "height": "6'10\"" }, { "id": "a7550360-8bbe-11ea-bc55-0242ac130003", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/rd-talent/Stat/kane_stat.png", "name": "Kane", "weight": "323lbs", "height": "7'0\"" }, { "id": "eed565ae-8bbe-11ea-bc55-0242ac130003", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/rd-talent/Stat/triple_h_stat.png", "name": "Triple H", "weight": "255lbs", "height": "6'4\"" }, { "id": "5604dd37-8ce3-4b2c-a762-8d0bb56da2d5", "picture": "https://www.wwe.com/f/styles/gallery_img_s/public/all/2017/05/brock_lesnar_stat--81a797251c1cc4c6f87d5659c1e246bf.png", "name": "Brock Lesnar", "weight": "286lbs", "height": "6'3\"" }]
export let playersCards: any = []
export let appendedCardsForWinningPlayer: any = [];

export const shuffleCards = (cardsData: any) => {
    const cardsDataCopy = deepCopy(cardsData);
    return _.shuffle(cardsDataCopy)
}

export const distributeCards = (cardsData: any, players = 5) => {
    playersCards = []
    for (let ictr = 0; ictr < players; ictr++) {
        playersCards.push([])
    }

    _.map(cardsData, (cardData, index: number) => {
        playersCards[(index % players)].push(cardData)
        // console.log(cardData.name);
    })

    return playersCards;
}

export const drawDealtCards = (distributedCardsData: any) => {
    const dealtCards: any = _.map(distributedCardsData, (playerCards) => {
        // return (playerCards[props.index])
        return _.last(playerCards)
    })

    playersCards = _.map(playersCards, (playerCards: any) => {
        return _.remove(playerCards, (card: any) => {
            return _.findIndex(dealtCards, (dealtCard: any) => {
                return dealtCard && card && dealtCard.id === card.id
            }) === -1
        })
    })

    return {
        dealtCards: dealtCards || [],
        remainingCards: playersCards || []
    }
}

export const findDealWinner = (dealtCards: any, props: any, property: string) => {

    console.log('dealtCards=', dealtCards)

    const whichCardIsMax: any = _.maxBy(dealtCards, (card) => {
        return card && card[property]
    })

    const whichPlayerIsMax: number = _.findIndex(dealtCards, (card: any) => {
        console.log('card=', card, 'whichCardIsMax=', whichCardIsMax);
        return card && whichCardIsMax && card.id === whichCardIsMax.id
    })

    return {
        dealWinningCard: whichCardIsMax,
        dealWinningPlayer: whichPlayerIsMax,
    }
}

export const processDealtCards = (distributedCardsData: any, dealtCards: any, dealWinningPlayer: number) => {
    playersCards = deepCopy(distributedCardsData)
    playersCards[dealWinningPlayer] = _.filter(_.concat(dealtCards, distributedCardsData[dealWinningPlayer]), (card) => {
        return !_.isUndefined(card)
    })

    return playersCards;
}

export const findFinalWinner = (distributedCardsData: any) => {
    const winnerPlayerNumber = _.findIndex(distributedCardsData, (distributedCards: any) => {
        return distributedCards.length === cardsData.length
    })
    return winnerPlayerNumber;
}