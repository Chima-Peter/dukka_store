import creditCardType from "credit-card-type";

const getCardType = (cardNumber: string) => {
    const cardType = creditCardType(cardNumber)
    if (cardType[0]) {
        return cardType[0].niceType
    }
    return 'unknown'
}

export default getCardType