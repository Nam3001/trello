/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import { Container, Draggable } from 'react-smooth-dnd'
// font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// component
import style from './Column.module.scss'
import Card from '../Card/Card'
import AddNewItem from '../AddNewItem/AddNewItem'
// utilities
import { mapOrder, applyDrag, createCardData } from '@/utils'

let cx = classNames.bind(style)

function Column(props) {
    const { className } = props

    // state
    const [isAddingCard, setIsAddingCard] = useState(false)
    const [column, setColumn] = useState(props.column)
    const [cards, setCards] = useState(column.cardList)
    const [newCard, setNewCard] = useState('')

    // ref
    const textareaRef = useRef(null)
    const addCardRef = useRef(null)

    const cardOrder = column.cardOrder
    useEffect(() => {
        const newCardList = mapOrder(column.cardList, cardOrder, 'cardId')
        setCards(newCardList)
    }, [])

    const onCardDrop = (dropResult, columnId) => {
        const { removedIndex, addedIndex } = dropResult
        if (removedIndex === null && addedIndex === null) return

        // S1:
        // const newBoard = { ...board }
        // const columnIndex = board.columns.columnList.findIndex(
        //     (x) => x.columnId === columnId
        // )

        const newColumn = { ...column }
        newColumn.cardList = applyDrag(newColumn.cardList, dropResult)
        setCards(newColumn.cardList)
        setColumn(newColumn)
    }

    const onChangeColumnName = (e) => {
        const newColumn = { ...column }
        newColumn.columnName = e.target.value
        setColumn(newColumn)
    }

    const addCardEvent = {
        onClose() {
            setIsAddingCard(false)
        },
        onInput(e) {
            const cardContent = e.target.value
            setNewCard(cardContent)
        },
        onAddCard() {
            const cardList = createCardData(cards, newCard)
            const newColumn = Object.assign({}, column)
            newColumn.cardList = cardList
            setCards(cardList)
            setColumn(newColumn)
            setNewCard('')
            addCardRef.current.focus()
        }
    }

    return (
        <div className={className}>
            <div className={style.column}>
                <div
                    className={cx('header', 'column-drag-handle')}
                    onClick={() => {
                        textareaRef.current.disabled = false
                        textareaRef.current.focus()
                    }}
                >
                    <textarea
                        ref={textareaRef}
                        value={column.columnName}
                        onChange={onChangeColumnName}
                        disabled
                        onBlur={(e) => (e.target.disabled = true)}
                    />
                </div>
                <div className={cx('body')}>
                    <Container
                        orientation="vertical"
                        groupName="col"
                        dragClass={cx('card-ghost')}
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: cx('card-drop-preview')
                        }}
                        getChildPayload={(index) => column.cardList[index]}
                        onDrop={(payload) =>
                            onCardDrop(payload, column.columnId)
                        }
                    >
                        {cards.map((card) => (
                            <Draggable key={card.cardId}>
                                <Card>{card.content}</Card>
                            </Draggable>
                        ))}
                    </Container>
                    {isAddingCard && (
                        <AddNewItem
                            ref={addCardRef}
                            cardContent={newCard}
                            event={addCardEvent}
                        />
                    )}
                </div>
                {isAddingCard || (
                    <div
                        onClick={() => setIsAddingCard(true)}
                        className={cx('footer')}
                    >
                        <div className={cx('footerInner')}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Thêm thẻ</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default React.memo(Column)
