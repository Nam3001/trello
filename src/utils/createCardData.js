import { nanoid } from 'nanoid'

const createCardData = (cards, cardContent) => {
    if (!Array.isArray(cards)) return null

    const cardId = nanoid()
    const cardList = Array.from(cards)
    const cardItem = {
        cardId,
        content: cardContent,
        cover: null
    }
    cardList.push(cardItem)
    return cardList
}

export default createCardData